import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/app-text";
import BottomSheet from "@/components/ui/bottom-sheet";
import Button from "@/components/ui/button";
import { useImagePicker } from "@/hooks/use-image-picker";
import { useTheme } from "@/hooks/use-theme";
import { s } from "@/utils/scale";

interface LicencePhotoPickerProps {
  uri: string | null;
  onChange: (uri: string | null) => void;
  error?: boolean;
}

/** Gray camera box from the design. Tap -> choose "Take photo" or "Upload from gallery". */
export default function LicencePhotoPicker({ uri, onChange, error }: LicencePhotoPickerProps) {
  const { colors } = useTheme();
  const { loading, takePhoto, pickFromLibrary } = useImagePicker();
  const [sheetOpen, setSheetOpen] = useState(false);

  const choose = async (source: "camera" | "library") => {
    setSheetOpen(false);
    const result = source === "camera" ? await takePhoto() : await pickFromLibrary();
    if (result) onChange(result);
  };

  return (
    <View style={styles.wrap}>
      <AppText size={20} weight="bold" align="center">
        Upload Your Licence Phone
      </AppText>

      <Pressable
        onPress={() => setSheetOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Add a photo of your driving licence"
        style={[
          styles.box,
          { backgroundColor: colors.photoBox },
          error && { borderWidth: 1, borderColor: "#E5484D" },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : uri ? (
          <Image source={{ uri }} contentFit="cover" style={styles.photo} transition={150} />
        ) : (
          <Feather name="camera" size={s(86)} color={colors.photoIcon} />
        )}
      </Pressable>

      {uri ? (
        <Pressable onPress={() => onChange(null)} hitSlop={8}>
          <AppText size={13} weight="medium" color={colors.textSecondary} align="center">
            Remove photo
          </AppText>
        </Pressable>
      ) : null}

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        <AppText size={16} weight="bold" align="center">
          Driving licence photo
        </AppText>
        <Button
          title="Take a photo"
          onPress={() => choose("camera")}
          icon={<Feather name="camera" size={s(18)} color={colors.onPrimary} />}
        />
        <Button
          title="Upload from gallery"
          onPress={() => choose("library")}
          icon={<Feather name="image" size={s(18)} color={colors.onPrimary} />}
        />
        <Pressable onPress={() => setSheetOpen(false)} style={styles.cancel}>
          <AppText size={14} weight="medium" color={colors.textSecondary} align="center">
            Cancel
          </AppText>
        </Pressable>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  // 91px from the last field (FormStep already adds a 31px gap), 86px from title to the box.
  wrap: { alignItems: "center", marginTop: s(58) },
  box: {
    width: s(200),
    height: s(150),
    borderRadius: s(9),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: s(83),
    marginBottom: s(12),
  },
  photo: { width: "100%", height: "100%" },
  cancel: { paddingVertical: s(8) },
});
