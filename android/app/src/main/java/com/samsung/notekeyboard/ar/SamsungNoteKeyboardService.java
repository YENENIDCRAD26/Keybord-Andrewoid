package com.samsung.notekeyboard.ar;

import android.inputmethodservice.InputMethodService;
import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputConnection;

public class SamsungNoteKeyboardService extends InputMethodService implements KeyboardView.OnKeyboardActionListener {

    private KeyboardView keyboardView;
    private Keyboard arabicKeyboard;
    private Keyboard symbolsKeyboard;
    private Keyboard shiftedKeyboard;
    private Keyboard currentKeyboard;
    private boolean isSymbolsMode = false;

    @Override
    public View onCreateInputView() {
        keyboardView = (KeyboardView) getLayoutInflater().inflate(R.layout.keyboard_view_container, null);
        arabicKeyboard = new Keyboard(this, R.xml.qwerty_arabic);
        symbolsKeyboard = new Keyboard(this, R.xml.symbols);
        shiftedKeyboard = new Keyboard(this, R.xml.qwerty_shifted);
        
        currentKeyboard = arabicKeyboard;
        keyboardView.setKeyboard(currentKeyboard);
        keyboardView.setOnKeyboardActionListener(this);
        return keyboardView;
    }

    @Override
    public void onKey(int primaryCode, int[] keyCodes) {
        InputConnection inputConnection = getCurrentInputConnection();
        if (inputConnection == null) return;
        
        switch (primaryCode) {
            case -5: // Backspace
                inputConnection.deleteSurroundingText(1, 0);
                break;
            case 10: // Enter
                inputConnection.sendKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_ENTER));
                inputConnection.sendKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_ENTER));
                break;
            case -1: // Shift / Symbols Toggle
                if (isSymbolsMode) {
                    currentKeyboard = arabicKeyboard;
                    isSymbolsMode = false;
                } else if (currentKeyboard == arabicKeyboard) {
                    currentKeyboard = shiftedKeyboard;
                } else {
                    currentKeyboard = arabicKeyboard;
                }
                keyboardView.setKeyboard(currentKeyboard);
                keyboardView.invalidateAllKeys();
                break;
            case -2: // Symbols Layout Toggle
                if (isSymbolsMode) {
                    currentKeyboard = arabicKeyboard;
                    isSymbolsMode = false;
                } else {
                    currentKeyboard = symbolsKeyboard;
                    isSymbolsMode = true;
                }
                keyboardView.setKeyboard(currentKeyboard);
                keyboardView.invalidateAllKeys();
                break;
            default:
                if (primaryCode > 0) {
                    char codeChar = (char) primaryCode;
                    inputConnection.commitText(String.valueOf(codeChar), 1);
                }
                break;
        }
    }

    @Override
    public void onPress(int primaryCode) {}

    @Override
    public void onRelease(int primaryCode) {}

    @Override
    public void onText(CharSequence text) {
        InputConnection inputConnection = getCurrentInputConnection();
        if (inputConnection != null && text != null) {
            inputConnection.commitText(text, 1);
        }
    }

    @Override
    public void swipeLeft() {}

    @Override
    public void swipeRight() {}

    @Override
    public void swipeDown() {}

    @Override
    public void swipeUp() {}
}
