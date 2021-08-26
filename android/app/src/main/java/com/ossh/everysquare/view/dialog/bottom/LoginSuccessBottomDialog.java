package com.ossh.everysquare.view.dialog.bottom;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.google.android.material.bottomsheet.BottomSheetDialogFragment;
import com.ossh.everysquare.databinding.DialogBottomLoginSucessBinding;
import com.ossh.everysquare.model.LoginUser;
import com.ossh.everysquare.view.activity.LoginActivity;

/**
 * @author : seungHo
 * @since : 2021-08-25
 * class : LoginSuccessBottomDialog.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description : 로그인 성공시 띄워주는 다이얼로그
 */
public class LoginSuccessBottomDialog extends BottomSheetDialogFragment {
    private static final String TAG = LoginSuccessBottomDialog.class.getSimpleName();
    private DialogBottomLoginSucessBinding binding;
    private LoginUser getLoginUser;
    private LoginActivity activity;
    private OnSubmitToLoginActivity onSubmitToLoginActivity = null;

    public interface OnSubmitToLoginActivity{
        void onSubmit(LoginUser loginUser);
    }

    public void setOnSubmitToLoginActivity(OnSubmitToLoginActivity onSubmitToLoginActivity) {
        this.onSubmitToLoginActivity = onSubmitToLoginActivity;
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if(getActivity()!=null){
            activity = (LoginActivity) getActivity();

        }
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DialogBottomLoginSucessBinding.inflate(getLayoutInflater());
        if(getArguments()!=null){
            getLoginUser = (LoginUser) getArguments().getSerializable("loginUser");
            binding.setUserLogin(getLoginUser);
            Glide.with(activity).load(getLoginUser.getProfileURL()).into(binding.ivUserProfile);

        }

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        init();
        event();
    }
    private void init(){

    }
    private void event(){
        /**
          확인버튼 눌렀을때 변경된 사진,변경된 닉네임  {@link LoginActivity} 로 넘겨줌
         */
        binding.btnLoginConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String getName = binding.tiEtUserName.getText().toString();
                getLoginUser.setNickname(getName);
                onSubmitToLoginActivity.onSubmit(getLoginUser);
            }
        });
    }
}
