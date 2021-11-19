package com.cashtrack;

import android.app.Notification;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import javax.annotation.Nullable;

public class GeolocationTaskService extends HeadlessJsTaskService
{

    @Override
    public void onCreate()
    {
        super.onCreate();
        startForeground(1, new Notification());
    }

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent)
    {
        Bundle extras = intent.getExtras();
        if (extras != null)
        {
            return new HeadlessJsTaskConfig(
                    "GeolocationTask",
                    Arguments.fromBundle(extras),
                    5000,
                    true
            );
        }
        return null;
    }
}
