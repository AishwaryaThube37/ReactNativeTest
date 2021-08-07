package com.rncodetest;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class NativeModuleString extends ReactContextBaseJavaModule {
    NativeModuleString(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "GetKey";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getServiceKey() {
        String serviceKey = getReactApplicationContext().getResources().getString(R.string.service_key);
        Log.i("Check",serviceKey);
        return serviceKey;
    }
}
