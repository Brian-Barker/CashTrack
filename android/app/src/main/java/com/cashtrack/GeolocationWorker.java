package com.cashtrack;

import android.annotation.SuppressLint;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.HandlerThread;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.ListenableWorker;
import androidx.work.WorkerParameters;

import com.agontuk.RNFusedLocation.FusedLocationProvider;
import com.facebook.react.HeadlessJsTaskService;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationAvailability;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.common.util.concurrent.ListenableFuture;

import androidx.concurrent.futures.CallbackToFutureAdapter;

import java.io.UnsupportedEncodingException;

public class GeolocationWorker extends ListenableWorker
{
    /**
     * @param appContext   The application {@link Context}
     * @param workerParams Parameters to setup the internal state of this worker
     */

    private String mKey;
    private final Context mContext;
    private final FusedLocationProviderClient mFusedLocationClient;
    private final HandlerThread mHandlerThread = new HandlerThread("RequestLocation");

    public GeolocationWorker(@NonNull Context appContext, @NonNull WorkerParameters workerParams)
    {
        super(appContext, workerParams);
        this.mKey = workerParams.getInputData().getString("key");
        this.mContext = appContext;
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(appContext);
    }

    private final LocationCallback fusedTrackerCallback = new LocationCallback()
    {
        @Override
        public void onLocationResult(@NonNull LocationResult locationResult)
        {
//            super.onLocationResult(locationResult);
            try {
                locationResult.getLastLocation();
                Location location = locationResult.getLastLocation();
                Log.i("Geolocation Worker", "Location: " + location.toString());

                Intent service = new Intent(mContext, GeolocationTaskService.class);
                Bundle bundle = new Bundle();
                bundle.putDouble("latitude", location.getLatitude());
                bundle.putDouble("longitude", location.getLongitude());
                service.putExtras(bundle);

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                {
                    mContext.startForegroundService(service);
                }
                else
                {
                    mContext.startService(service);
                }

                HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());

                mFusedLocationClient.removeLocationUpdates(fusedTrackerCallback);
                mHandlerThread.quit();
            }
            catch (Exception e)
            {
                Log.e("Geolocation Worker", e.getLocalizedMessage());
            }
        }

        @Override
        public void onLocationAvailability(@NonNull LocationAvailability locationAvailability)
        {
            super.onLocationAvailability(locationAvailability);
        }
    };

    @NonNull
    @Override
    public ListenableFuture<Result> startWork()
    {
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationRequest.setFastestInterval(2000);
        locationRequest.setInterval(2000);

        mHandlerThread.start();

        return CallbackToFutureAdapter.getFuture(completer -> {
            @SuppressLint("MissingPermission") Runnable runnable = () -> {
                Log.i("Worker Runnable", "Requesting Location...");
                mFusedLocationClient.requestLocationUpdates(
                        locationRequest,
                        fusedTrackerCallback,
                        mHandlerThread.getLooper());
                completer.set(Result.success());
            };

            new Thread(runnable).start();
            return runnable;
        });
    }
}
