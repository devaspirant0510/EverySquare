package com.ossh.everysquare.view.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.ossh.everysquare.databinding.FragmentRoomBinding;
import com.ossh.everysquare.databinding.FragmentSettingBinding;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : SettingFragment.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 */
public class SettingFragment extends Fragment {
    private static final String TAG = SettingFragment.class.getSimpleName();
    private FragmentSettingBinding binding;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        binding = FragmentSettingBinding.inflate(inflater,container,false);
        return binding.getRoot();
    }
}
