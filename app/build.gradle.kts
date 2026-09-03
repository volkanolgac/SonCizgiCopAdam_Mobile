import java.io.File
import java.security.KeyStore

plugins {
    alias(libs.plugins.android.application)
}

fun resolveReleaseKeystore(): File? {
    val envKeys = listOf(
        "KEYSTORE_PATH",
        "RELEASE_KEYSTORE_PATH",
        "STORE_FILE",
        "RELEASE_STORE_FILE",
        "ANDROID_KEYSTORE_PATH",
        "ANDROID_STORE_FILE",
        "KEYSTORE_FILE",
        "RELEASE_KEYSTORE_FILE"
    )
    for (key in envKeys) {
        val path = System.getenv(key) ?: (project.findProperty(key) as? String)
        if (!path.isNullOrBlank()) {
            val f = File(path)
            if (f.exists() && f.isFile) {
                return f
            }
        }
    }
    val tmpDir = File("/tmp")
    if (tmpDir.exists() && tmpDir.isDirectory) {
        val match = tmpDir.listFiles()?.firstOrNull { file ->
            file.isFile && (
                file.name.startsWith("keystore-") ||
                file.name.endsWith(".jks") ||
                file.name.endsWith(".keystore")
            )
        }
        if (match != null) return match
    }
    return null
}

fun resolveReleaseStorePassword(): String {
    val envKeys = listOf(
        "KEYSTORE_PASSWORD",
        "RELEASE_KEYSTORE_PASSWORD",
        "STORE_PASSWORD",
        "RELEASE_STORE_PASSWORD",
        "ANDROID_KEYSTORE_PASSWORD",
        "ANDROID_STORE_PASSWORD",
        "STORE_PASS",
        "KEYSTORE_PASS",
        "RELEASE_STORE_PASS"
    )
    for (key in envKeys) {
        val pass = System.getenv(key) ?: (project.findProperty(key) as? String)
        if (!pass.isNullOrEmpty()) {
            return pass
        }
    }
    return "android"
}

fun resolveReleaseKeyPassword(storePass: String): String {
    val envKeys = listOf(
        "KEY_PASSWORD",
        "RELEASE_KEY_PASSWORD",
        "ANDROID_KEY_PASSWORD",
        "KEY_PASS",
        "RELEASE_KEY_PASS"
    )
    for (key in envKeys) {
        val pass = System.getenv(key) ?: (project.findProperty(key) as? String)
        if (!pass.isNullOrEmpty()) {
            return pass
        }
    }
    return storePass
}

fun resolveReleaseAlias(ksFile: File, storePass: String): String? {
    val envKeys = listOf(
        "KEY_ALIAS",
        "RELEASE_KEY_ALIAS",
        "ANDROID_KEY_ALIAS",
        "ALIAS"
    )
    var envAlias: String? = null
    for (key in envKeys) {
        val a = System.getenv(key) ?: (project.findProperty(key) as? String)
        if (!a.isNullOrBlank()) {
            envAlias = a
            break
        }
    }

    val ks: KeyStore? = try {
        val k = KeyStore.getInstance("PKCS12")
        ksFile.inputStream().use { stream -> k.load(stream, storePass.toCharArray()) }
        k
    } catch (_: Exception) {
        try {
            val k = KeyStore.getInstance("JKS")
            ksFile.inputStream().use { stream -> k.load(stream, storePass.toCharArray()) }
            k
        } catch (_: Exception) {
            try {
                val k = KeyStore.getInstance(KeyStore.getDefaultType())
                ksFile.inputStream().use { stream -> k.load(stream, storePass.toCharArray()) }
                k
            } catch (_: Exception) {
                null
            }
        }
    }

    if (ks != null) {
        val aliases: List<String> = try {
            val list = mutableListOf<String>()
            val enumElements = ks.aliases()
            while (enumElements.hasMoreElements()) {
                list.add(enumElements.nextElement())
            }
            list
        } catch (_: Exception) {
            emptyList()
        }

        if (!envAlias.isNullOrBlank() && envAlias != "androiddebugkey" && ks.containsAlias(envAlias)) {
            return envAlias
        }
        val keyEntryAlias = aliases.firstOrNull { alias ->
            try { ks.isKeyEntry(alias) } catch (_: Exception) { false }
        } ?: aliases.firstOrNull()

        if (keyEntryAlias != null) {
            return keyEntryAlias
        }
    }

    if (!envAlias.isNullOrBlank() && envAlias != "androiddebugkey") {
        return envAlias
    }

    return null
}

val releaseKeystoreFile = resolveReleaseKeystore()
val releaseStorePassword = resolveReleaseStorePassword()
val releaseKeyPassword = resolveReleaseKeyPassword(releaseStorePassword)
val releaseKeyAlias = releaseKeystoreFile?.let { resolveReleaseAlias(it, releaseStorePassword) }

android {
    namespace = "com.volkanolgac.soncizgicopadam"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.volkanolgac.soncizgicopadam"
        minSdk = 24
        targetSdk = 36
        versionCode = 2
        versionName = "2.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("../debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
        if (releaseKeystoreFile != null && releaseKeyAlias != null) {
            create("release") {
                storeFile = releaseKeystoreFile
                storePassword = releaseStorePassword
                keyAlias = releaseKeyAlias
                keyPassword = releaseKeyPassword
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            if (releaseKeystoreFile != null && releaseKeyAlias != null) {
                signingConfig = signingConfigs.getByName("release")
            } else {
                signingConfig = null
            }
        }
        debug {
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.webkit)
}
