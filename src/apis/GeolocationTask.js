import PushNotification from 'react-native-push-notification';

module.exports = async taskData => {
  if (PushNotification.getChannels() === undefined) {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  }

  let currentTime = new Date();

  PushNotification.cancelAllLocalNotifications();

  PushNotification.localNotification({
    channelId: 'test-channel',
    title: currentTime.toISOString(),
    message:
      'Longitude: ' + taskData.longitude + ' Latitude: ' + taskData.latitude,
    allowWhileIdle: true,
    visibility: 'public',
    importance: 'high',
  });

  console.log(currentTime.toISOString());
  console.log('Firing from Java!');
  console.log(taskData);
};
