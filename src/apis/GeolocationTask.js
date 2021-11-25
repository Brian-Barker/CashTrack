import PushNotification from 'react-native-push-notification';
import {fetchPlaceData, fetchUserToken, loginUser} from './Backend';

module.exports = async taskData => {
  if (PushNotification.getChannels() === undefined) {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  }

  console.log('Task Data', taskData);

  let token = await fetchUserToken();

  console.log(token);

  let res = await fetchPlaceData(token, taskData.latitude, taskData.longitude);

  console.log('Res', res);

  if (res[0] === undefined) {
    return;
  }

  PushNotification.cancelAllLocalNotifications();

  PushNotification.localNotification({
    channelId: 'test-channel',
    title: 'Keep Track with Ca$hTrack!',
    message: res[0].name,
    allowWhileIdle: true,
    visibility: 'public',
    importance: 'high',
  });

  console.log('Firing from Java!');
  console.log(taskData);
};
