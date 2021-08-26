package com.ossh.everysquare.view.activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.navigation.NavigationBarView;
import com.ossh.everysquare.R;
import com.ossh.everysquare.databinding.ActivityMainBinding;
import com.ossh.everysquare.util.FragId;
import com.ossh.everysquare.view.fragment.HomeFragment;
import com.ossh.everysquare.view.fragment.RoomFragment;
import com.ossh.everysquare.view.fragment.SearchFragment;
import com.ossh.everysquare.view.fragment.SettingFragment;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private Fragment fr = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        init();
        event();
    }
    private void init(){

    }
    private void event(){
        binding.bottomNavigationView.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.bni_item_home:
                        changeFrag(FragId.HOME_FRAGMENT);
                        break;
                    case R.id.bni_item_room_create:
                        changeFrag(FragId.ROOM_FRAGMENT);
                        break;
                    case R.id.bni_item_room_search:
                        changeFrag(FragId.SEARCH_FRAGMENT);
                        break;
                    case R.id.bni_item_setting:
                        changeFrag(FragId.SETTING_FRAGMENT);
                        break;
                }
                return true;
            }
        });

    }
    private void changeFrag(FragId fragId){
        fm = getSupportFragmentManager();
        ft = fm.beginTransaction();
        switch (fragId){
            case HOME_FRAGMENT:
                fr = new HomeFragment();
                break;
            case ROOM_FRAGMENT:
                fr = new RoomFragment();
                break;
            case SEARCH_FRAGMENT:
                fr = new SearchFragment();
                break;
            case SETTING_FRAGMENT:
                fr = new SettingFragment();
                break;
        }
        ft.replace(R.id.root_view,fr).commit();

    }
}