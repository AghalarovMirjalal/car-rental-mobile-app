import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";

type Source = "camera" | "library";

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
};

const notify = (title: string, message: string) => {
  if (Platform.OS === "web") window.alert(`${title}\n${message}`);
  else Alert.alert(title, message);
};

/**
 * Wraps expo-image-picker: asks for the right permission, then opens the camera or the gallery.
 * Resolves with the picked image uri (or null when cancelled / denied).
 */
export function useImagePicker() {
  const [loading, setLoading] = useState(false);

  const pick = useCallback(async (source: Source): Promise<string | null> => {
    setLoading(true);
    try {
      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          notify("Camera access needed", "Allow camera access in settings to take a photo of your licence.");
          return null;
        }
        const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);
        return result.canceled ? null : result.assets[0].uri;
      }

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        notify("Gallery access needed", "Allow photo access in settings to upload your licence.");
        return null;
      }
      const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
      return result.canceled ? null : result.assets[0].uri;
    } catch {
      notify("Something went wrong", "Could not open the image picker. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    takePhoto: () => pick("camera"),
    pickFromLibrary: () => pick("library"),
  };
}
