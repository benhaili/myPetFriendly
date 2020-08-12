package com.example.petsitterisi.services;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
public class ApiProfileProprietaireFetcher extends AsyncTask<String, Nullable, String> {

    private Context  context;

    String js = "";

    public ApiProfileProprietaireFetcher(Context  context) {
        this.context = context;
    }

    @Override
    protected String doInBackground(String... urls) {
        String result = null;

        try {
            URL url = new URL(urls[0]);
            Log.d("DEBUG", "test");
            js = (urls[0]);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setDoOutput(false);
            urlConnection.setDoInput(true);
            urlConnection.connect();
            urlConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            urlConnection.setRequestMethod("POST");

            OutputStream os = urlConnection.getOutputStream();
            os.write(urls[1].getBytes("UTF-8"));

            int codeRetour = urlConnection.getResponseCode();

            Log.d("DEBUG", String.valueOf(codeRetour));
            if (codeRetour == HttpURLConnection.HTTP_OK) {
                String line;
                BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                while ((line = in.readLine()) != null)
                    result += line;

            }

        } catch (Exception ex) {
            Log.d("DEBUG", ex.getMessage());
        }

        return result;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        Toast.makeText(context, s, Toast.LENGTH_LONG).show();

    }

    private String inputStreamToString(InputStream is) {
        String rLine = "";
        StringBuilder answer = new StringBuilder();

        InputStreamReader isr = new InputStreamReader(is);

        BufferedReader rd = new BufferedReader(isr);

        String in = "";


        try {
            while ((rLine = rd.readLine()) != null) {
                answer.append(rLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return answer.toString();
    }


}