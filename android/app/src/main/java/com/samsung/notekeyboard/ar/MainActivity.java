package com.samsung.notekeyboard.ar;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.view.inputmethod.InputMethodInfo;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JavascriptInterface;
import com.getcapacitor.BridgeActivity;
import java.util.List;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Expose native Android Keyboard Bridge to WebView for 1-click settings launch
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().addJavascriptInterface(new AndroidKeyboardBridge(this), "AndroidKeyboardBridge");
        }
    }

    public static class AndroidKeyboardBridge {
        private final Context context;

        public AndroidKeyboardBridge(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public void openInputMethodSettings() {
            try {
                Intent intent = new Intent(Settings.ACTION_INPUT_METHOD_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void showInputMethodPicker() {
            try {
                InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
                if (imm != null) {
                    imm.showInputMethodPicker();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public boolean isKeyboardEnabled() {
            try {
                InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
                if (imm != null) {
                    List<InputMethodInfo> enabledMethods = imm.getEnabledInputMethodList();
                    String myPackage = context.getPackageName();
                    for (InputMethodInfo imi : enabledMethods) {
                        if (imi.getPackageName().equals(myPackage)) {
                            return true;
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return false;
        }
    }
}

