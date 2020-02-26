export openLocationSettings = () => {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
    );
  };


  export openNotificationSettings = () => {
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_SETTINGS);
  };