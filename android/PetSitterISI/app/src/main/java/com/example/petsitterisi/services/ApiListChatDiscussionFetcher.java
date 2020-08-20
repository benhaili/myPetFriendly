package com.example.petsitterisi.services;


import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Build;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import com.example.petsitterisi.BottomNavigationBar;
import com.example.petsitterisi.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
public class ApiListChatDiscussionFetcher extends AsyncTask<String, Nullable, String> {

    private Context  context;
    LinearLayout ll;
    SharedPreferences sharedpreferences;
    TextView item_message_recu;
    TextView item_message_envoye;


    public ApiListChatDiscussionFetcher(Context  context, LinearLayout llParam) {
        this.context = context;
        this.ll = llParam;
        sharedpreferences = context.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE);

    }

    @Override
    protected String doInBackground(String... urls) {

//        String result = "";
//
//        try {
//            URL url = new URL(urls[0]);
//
//
//            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//            urlConnection.setDoOutput(false);
//            urlConnection.setDoInput(true);
//            urlConnection.setRequestMethod("GET");
//            urlConnection.setRequestProperty("Content-Type", "application/json; utf-8");
//            urlConnection.connect();
//
//            int codeRetour = urlConnection.getResponseCode();
//
//
//            if (codeRetour == HttpURLConnection.HTTP_OK) {
//
//                BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
//
//                String line = "";
//                while ((line = in.readLine()) != null)
//                    result += line;
//
//            }
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//
              return "";
    }



    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @SuppressLint({"ResourceAsColor", "SetTextI18n", "WrongViewCast"})
    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        try {

            String tContents = "";
            String concat = "";
            try {
                InputStream stream = context.getAssets().open("");
                int size = stream.available();
                byte[] buffer = new byte[size];
                stream.read(buffer);
                stream.close();
                tContents = new String(buffer);

            JSONArray jsonArray = new JSONArray(tContents);

            for(int i = 0; i < jsonArray.length(); i++){

                JSONObject chatJsonObject = jsonArray.getJSONObject(i);

//                String nom_proprietaire = chatJsonObject.getString("nom");
//
//                View cardChatParam = View.inflate(context , R.layout.card_chat,null);
//
//                TextView prenom_chat = cardChatParam.findViewById(R.id.prenom_chat);
//
//                prenom_chat.setText(nom_proprietaire);
//
//                card_chat_select = cardChatParam.findViewById(R.id.car_chat_selectionner);
//
//                card_chat_select.setOnClickListener(new View.OnClickListener() {
//                    @Override
//                    public void onClick(View v) {
//
//                        Intent intent = new Intent(context, BottomNavigationBar.class);
//                        intent.putExtra("ChatDiscussion", "true");
//                        context.startActivity(intent);
//
//                    }
//                });
//
//
//                ll.addView(cardChatParam);



            }


        } catch (JSONException e) {
            e.printStackTrace();
        }


    }catch (Exception e)
        {
            e.printStackTrace();
        }


        View cardMessageRecuParam =  View.inflate(context , R.layout.activity_item_message_recus,null);
        View cardMessageEnvoyerParam = View.inflate(context , R.layout.activity_item_message_envoyer,null);

        item_message_recu =  cardMessageRecuParam.findViewById(R.id.text_message_body_recu);
        item_message_envoye = cardMessageEnvoyerParam.findViewById(R.id.text_message_body_envoyer);


        ll.addView(cardMessageRecuParam);
        ll.addView(cardMessageEnvoyerParam);
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
