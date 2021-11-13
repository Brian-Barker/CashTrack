package com.cashtrack;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Data;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkInfo;
import androidx.work.WorkManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.common.util.concurrent.ListenableFuture;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class GeolocationModule extends ReactContextBaseJavaModule
{
    private final ReactApplicationContext mReactContext;

    GeolocationModule(ReactApplicationContext reactApplicationContext)
    {
        super(reactApplicationContext);
        this.mReactContext = reactApplicationContext;
    }

    @NonNull
    @Override
    public String getName()
    {
        return "GeolocationModule";
    }

    @ReactMethod
    public void checkQueue()
    {
        ListenableFuture<List<WorkInfo>> request = WorkManager.getInstance(mReactContext).getWorkInfosByTag("GeolocationWorker");
        Log.i("Geolocation Module", "-------------");
        try {
            List<WorkInfo> requestList = request.get();
            for (WorkInfo work: requestList)
            {
                Log.i("Geolocation Module", "Work Status: " + work.getState() + " " + new Date().toString());
            }
        }
        catch (Exception e)
        {
            Log.i("Geolocation Module", "No work request?");
        }
    }

    @ReactMethod
    public void clearQueue()
    {
        WorkManager.getInstance(mReactContext).cancelAllWorkByTag("GeolocationWorker");
        checkQueue();
    }

    @ReactMethod
    public void startWorker()
    {
        PeriodicWorkRequest.Builder builder = new PeriodicWorkRequest.Builder(
                GeolocationWorker.class,
                PeriodicWorkRequest.MIN_PERIODIC_INTERVAL_MILLIS,
                TimeUnit.MILLISECONDS)
                .addTag("GeolocationWorker");

        Data.Builder data = new Data.Builder();
        data.putString("key", "value");
        builder.setInputData(data.build());

        PeriodicWorkRequest periodicWorkRequest = builder.build();

        WorkManager.getInstance(mReactContext).enqueueUniquePeriodicWork("GeolocationWorker", ExistingPeriodicWorkPolicy.KEEP, periodicWorkRequest);
    }
}
