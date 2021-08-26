package com.ossh.everysquare.view.activity;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.kakao.sdk.auth.model.OAuthToken;
import com.kakao.sdk.user.UserApiClient;
import com.kakao.sdk.user.model.User;
import com.ossh.everysquare.databinding.ActivityLoginBinding;
import com.ossh.everysquare.model.LoginUser;
import com.ossh.everysquare.network.EverySquareAPI;
import com.ossh.everysquare.network.RetrofitHelper;
import com.ossh.everysquare.network.req.ReqPostLogin;
import com.ossh.everysquare.network.res.ResBaseLogin;
import com.ossh.everysquare.network.res.ResLogin;
import com.ossh.everysquare.util.SharedManger;
import com.ossh.everysquare.view.dialog.bottom.LoginSuccessBottomDialog;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;

import kotlin.Pair;
import kotlin.Unit;
import kotlin.jvm.functions.Function2;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * @author : seungHo
 * @since : 2021-08-25
 * class : LoginActivity.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description : 로그인 화면 (카카오,구글)
 */
public class LoginActivity extends AppCompatActivity implements LoginSuccessBottomDialog.OnSubmitToLoginActivity{
    private static final String TAG = LoginActivity.class.getSimpleName();
    private ActivityLoginBinding binding;
    private Function2<OAuthToken,Throwable,Unit> callback;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        init();
        event();
        getHashKey();
    }
    private void init(){
        // 로그인 성공여부 체크 콜백 메서드
        callback = new Function2<OAuthToken, Throwable, Unit>() {
            @Override
            public Unit invoke(OAuthToken oAuthToken, Throwable throwable) {
                Log.e(TAG, "invoke: ");
                if (oAuthToken != null) {
                    Toast.makeText(getApplicationContext(), "로그인 성공", Toast.LENGTH_SHORT).show();
                    onKakaoLoginSuccess();
                } else {
                    Toast.makeText(getApplicationContext(), "로그인 실패", Toast.LENGTH_SHORT).show();
                }
                return null;
            }
        };
        SharedManger.init(SharedManger.LOGIN_INFO,getApplicationContext());
        // 현재 기기에서 로그인 정보가 있는지 체크
        // 로그인 한 정보가 true 즉 로그인 한적이 있을경우
        if (SharedManger.loadData(SharedManger.SAVE_STATE_IS_LOGIN,false)){
            changeToMain();
        }

    }
    private void event(){
        binding.btnKakaoLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (UserApiClient.getInstance().isKakaoTalkLoginAvailable(LoginActivity.this)) {
                    UserApiClient.getInstance().loginWithKakaoTalk(LoginActivity.this, callback);
                } else {
                    UserApiClient.getInstance().loginWithKakaoAccount(LoginActivity.this, callback);
                }

            }
        });
    }

    // 카카오톡 로그인 성공시
    private void onKakaoLoginSuccess(){
        UserApiClient.getInstance().me(new Function2<User, Throwable, Unit>() {
            @Override
            public Unit invoke(User user, Throwable throwable) {
                // 유저정보를 가져왔을때
                if (user.getKakaoAccount() != null && user.getKakaoAccount().getProfile()!=null) {
                    // 유저 고유 값
                    String userId = String.valueOf(user.getId());
                    String userEmail = user.getKakaoAccount().getEmail();
                    String userProfileUrl = user.getKakaoAccount().getProfile().getProfileImageUrl();
                    String userNickName = user.getKakaoAccount().getProfile().getNickname();
                    LoginUser loginUser = new LoginUser(userId,userEmail,userNickName,userProfileUrl);
                    showLoginSuccessDialog(loginUser);
                } else {
                    Toast.makeText(getApplicationContext(), "유저정보를 제대로 가져오지 못헀습니다. 다시시도해주세요", Toast.LENGTH_LONG).show();
                }
                return null;
            }
        });
    }

    private void showLoginSuccessDialog(LoginUser loginUser){
        LoginSuccessBottomDialog loginSuccessBottomDialog = new LoginSuccessBottomDialog();
        Bundle args = new Bundle();
        args.putSerializable("loginUser",loginUser);
        loginSuccessBottomDialog.setArguments(args);
        loginSuccessBottomDialog.setOnSubmitToLoginActivity(this);
        loginSuccessBottomDialog.show(getSupportFragmentManager(),"loginSuccessDialog");
    }

    /**
     * 로그인 성공또는 기존에 로그인 했을경우 메인 화면으로 이동
     */
    private void changeToMain(){
        Intent intent = new Intent(LoginActivity.this,MainActivity.class);
        startActivity(intent);
        finish();
        Toast.makeText(LoginActivity.this, SharedManger.loadData(SharedManger.SAVE_STATE_NICKNAME,"")+"님 환영합니다.", Toast.LENGTH_SHORT).show();
    }

    /**
     * {@link LoginSuccessBottomDialog} 에서 확인 버튼 눌렀을때 변경된 사진정보, 닉네임 넘겨주는 콜백
     * @param loginUser 변경된 내용이 담긴 객체
     */
    @Override
    public void onSubmit(LoginUser loginUser) {
        ReqPostLogin reqPostLogin = new ReqPostLogin();
        reqPostLogin.setId(loginUser.getId());
        reqPostLogin.setNickname(loginUser.getNickname());
        reqPostLogin.setEmail(loginUser.getEmail());
        reqPostLogin.setProfileURL(loginUser.getProfileURL());

        EverySquareAPI squareAPI = RetrofitHelper.getInstance().getSquareAPI();
        // 로그인 요청
        squareAPI.postLogin(reqPostLogin).enqueue(new Callback<ResBaseLogin>() {
            @Override
            public void onResponse(@NotNull Call<ResBaseLogin> call,@NotNull Response<ResBaseLogin> response) {
                if(response.body()!=null){
                    Log.e(TAG, "onResponse: "+response.body().getMessage() );
                    ResLogin data = response.body().getData();
                    Log.e(TAG, "onResponse: "+response.body().getData() );
                    Log.e(TAG, "onResponse: "+response.headers().iterator() );
                    if(response.body().getMessage().equals("ok")){
                        Log.e(TAG, "onResponse: 신규유저" );
                    }else{
                        Log.e(TAG, "onResponse: 기존 유저" );
                    }
                    for (Iterator<Pair<String, String>> it = response.headers().iterator(); it.hasNext(); ) {
                        Pair<String, String> header = it.next();
                        if(header.getSecond().contains("user=s%")){
                            // 유저 쿠기 저장
                            Log.e(TAG, "onResponse: "+data.getNickname() );
                            SharedManger.saveData(SharedManger.SAVE_STATE_USER_COOKIE,header.getSecond());
                            SharedManger.saveData(SharedManger.SAVE_STATE_ID,data.getId());
                            SharedManger.saveData(SharedManger.SAVE_STATE_NICKNAME,data.getNickname());
                            SharedManger.saveData(SharedManger.SAVE_STATE_EMAIL,data.getEmail());
                            SharedManger.saveData(SharedManger.SAVE_STATE_PROFILE_URL,data.getProfileURL());
                            SharedManger.saveData(SharedManger.SAVE_STATE_IS_LOGIN,true);
                        }
                    }
                    changeToMain();
                }
            }
            @Override
            public void onFailure( Call<ResBaseLogin> call, Throwable t) {
                Log.e(TAG, "onFailure: "+t.getMessage() );
            }
        });
    }

    // 해시키  가져오기
    private void getHashKey() {
        PackageInfo packageInfo = null;
        try {
            packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        if (packageInfo == null)
            Log.e("KeyHash", "KeyHash:null");

        for (Signature signature : packageInfo.signatures) {
            try {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.e("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            } catch (NoSuchAlgorithmException e) {
                Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
            }
        }
    }
}
