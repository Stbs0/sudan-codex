// withNewHermesPath.ts
import { withAppBuildGradle, type ConfigPlugin } from "@expo/config-plugins";

const withHermesCommand: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    let buildGradle = config.modResults.contents;

    // The new Hermes command code to insert
    const newHermesCommand = `try {
    hermesCommand = new File(["node", "--print", "require.resolve('hermes-compiler/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getAbsolutePath() + "/hermesc/%OS-BIN%/hermesc"
} catch (Exception e) {
    // Fallback to old location in react-native package
    hermesCommand = new File(["node", "--print", "require.resolve('react-native/package.json')"].execute(null, rootDir).text.trim()).getParentFile().getAbsolutePath() + "/sdks/hermesc/%OS-BIN%/hermesc"
}`;

    // Replace the existing hermesCommand line with the try-catch block
    buildGradle = buildGradle.replace(
      /hermesCommand\s*=\s*new File\(\["node",.*?"require\.resolve\('react-native\/package\.json'\)"\]\.execute\(null, rootDir\)\.text\.trim\(\)\)\.getParentFile\(\)\.getAbsolutePath\(\)\s*\+\s*"\/sdks\/hermesc\/%OS-BIN%\/hermesc"/,
      newHermesCommand
    );

    config.modResults.contents = buildGradle;
    return config;
  });
};

module.exports = withHermesCommand;
