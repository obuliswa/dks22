package com.dkmy;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

    public class SplashActivity extends AppCompatActivity {
        
        protected void onCreate(Bundle savedInstanceState) {
            super .onCreate(savedInstanceState);

            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();

        }
    }

