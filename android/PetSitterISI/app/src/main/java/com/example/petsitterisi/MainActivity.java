package com.example.petsitterisi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
<<<<<<< HEAD
import android.widget.MediaController;
=======
import android.widget.Button;
import android.widget.MediaController;
import android.widget.TextView;
>>>>>>> mobile_android
import android.widget.VideoView;

import com.example.petsitterisi.services.ConnexionBd;

import java.io.InputStream;


public class MainActivity extends AppCompatActivity {

<<<<<<< HEAD
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ConnexionBd.copyBdFromAssets(this);
        setContentView(R.layout.activity_main);

=======
    TextView top_textView;
    Button connexion_button;
    Context ctx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx = this;
        setContentView(R.layout.activity_main);
        ConnexionBd.copyBdFromAssets(this);
        top_textView = findViewById(R.id.top_textView);
        connexion_button = findViewById(R.id.connexion_button);
        connexion_button.setBackgroundColor(getResources().getColor(R.color.black));
        connexion_button.setTextColor(getResources().getColor(R.color.white));
>>>>>>> mobile_android
        VideoView videoView =(VideoView)findViewById(R.id.videoView1);
        MediaController mediaController = new MediaController(this);
        mediaController.setAnchorView(videoView);
        Uri uri = Uri.parse(Environment.getExternalStorageDirectory().getPath()+"/media/1.mp4");
        String path = "android.resource://" + getPackageName() + "/" + R.raw.chien;
        videoView.setMediaController(mediaController);
        videoView.setVideoPath(path);
        videoView.requestFocus();
        mediaController.setVisibility(View.GONE);
        videoView.setMediaController(mediaController);
        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                mp.setVolume(0f, 0f);
                mp.setLooping(true);
            }
        });
        videoView.start();




<<<<<<< HEAD
=======
        //ouvrir l'activite connexion

        connexion_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ctx, Connexion.class);
                startActivity(intent);
            }
        });





>>>>>>> mobile_android
    }
}