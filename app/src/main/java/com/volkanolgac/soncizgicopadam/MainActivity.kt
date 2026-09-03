package com.volkanolgac.soncizgicopadam

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var assetLoader: WebViewAssetLoader

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Fullscreen immersive mode
        WindowCompat.setDecorFitsSystemWindows(window, false)
        val controller = WindowCompat.getInsetsController(window, window.decorView)
        controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        controller.hide(WindowInsetsCompat.Type.systemBars())

        webView = WebView(this).apply {
            setBackgroundColor(0xFFF7F4EC.toInt())
            overScrollMode = View.OVER_SCROLL_NEVER
            isHapticFeedbackEnabled = true
        }
        setContentView(webView)

        assetLoader = WebViewAssetLoader.Builder()
            .setDomain("appassets.androidplatform.net")
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            mediaPlaybackRequiresUserGesture = false
            allowFileAccess = false
            allowContentAccess = false
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            cacheMode = WebSettings.LOAD_DEFAULT
        }

        webView.addJavascriptInterface(AndroidBridge(this), "AndroidBridge")

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                val url = request.url

                // Let WebViewAssetLoader handle standard requests
                val response = assetLoader.shouldInterceptRequest(url)
                if (response != null) {
                    return response
                }

                // Fallback direct asset loader for local domain
                if (url.host == "appassets.androidplatform.net") {
                    val rawPath = url.path.orEmpty()
                    val assetPath = when {
                        rawPath.startsWith("/assets/") -> rawPath.removePrefix("/assets/")
                        rawPath.startsWith("/") -> rawPath.removePrefix("/")
                        else -> rawPath
                    }
                    if (assetPath.isNotEmpty()) {
                        try {
                            val stream = assets.open(assetPath)
                            val mimeType = when {
                                assetPath.endsWith(".html") -> "text/html"
                                assetPath.endsWith(".js") -> "application/javascript"
                                assetPath.endsWith(".css") -> "text/css"
                                assetPath.endsWith(".ttf") -> "font/ttf"
                                assetPath.endsWith(".woff2") -> "font/woff2"
                                assetPath.endsWith(".png") -> "image/png"
                                assetPath.endsWith(".ico") -> "image/x-icon"
                                assetPath.endsWith(".svg") -> "image/svg+xml"
                                assetPath.endsWith(".json") -> "application/json"
                                else -> "application/octet-stream"
                            }
                            val res = WebResourceResponse(mimeType, "utf-8", stream)
                            res.responseHeaders = mapOf(
                                "Access-Control-Allow-Origin" to "*",
                                "Cache-Control" to "no-cache"
                            )
                            return res
                        } catch (_: Exception) {
                            // Asset not found, fall through
                        }
                    }
                }
                return null
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                val url = request.url
                if (url.host == "appassets.androidplatform.net") {
                    return false
                }
                // External navigation opened in system browser
                try {
                    val intent = Intent(Intent.ACTION_VIEW, url)
                    startActivity(intent)
                } catch (_: Exception) {}
                return true
            }
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                webView.evaluateJavascript("typeof window.__onAndroidBack === 'function' ? window.__onAndroidBack() : false") { result ->
                    val handled = result == "true"
                    if (!handled) {
                        if (webView.canGoBack()) {
                            webView.goBack()
                        } else {
                            isEnabled = false
                            onBackPressedDispatcher.onBackPressed()
                        }
                    }
                }
            }
        })

        webView.loadUrl("https://appassets.androidplatform.net/assets/index.html")
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
        webView.pauseTimers()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        webView.resumeTimers()
        webView.evaluateJavascript("if (typeof window.__resumeAudio === 'function') window.__resumeAudio();", null)
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    class AndroidBridge(private val context: Context) {
        private val prefs = context.getSharedPreferences("cop_adam_progress", Context.MODE_PRIVATE)

        @JavascriptInterface
        fun saveProgress(json: String) {
            prefs.edit().putString("progress_data", json).apply()
        }

        @JavascriptInterface
        fun loadProgress(): String {
            return prefs.getString("progress_data", "") ?: ""
        }
    }
}
