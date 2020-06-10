import React from 'react';
import {Platform, View, Text} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {receiptModel, saveReceipt, shopModel} from './database/Paperbase';

export default class PushNotificationManager extends React.Component {
  componentDidMount() {
    this.registerDevice();
    this.registerNotificationEvents();
  }

  registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    Notifications.registerRemoteNotifications();
  };

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        //TODO SAVE THE RECEIVE REECEIPT

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        const element = notification.payload.extra;
        //TODO FIND THE WAY TO NOTIFY THE RECEIPT ON RECEIVE
        saveReceipt({
          shop: shopModel(
            element.shop.id.toString(),
            element.shop.name,
            element.shop.address,
          ),
          receipt: receiptModel(element.receipt, element.shop.id.toString()),
        });
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification);
        this.renderNotification(notification);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.getInitialNotification()
      .then(notification => {
        console.log('Initial notification was:', notification || 'N/A');
      })
      .catch(err => console.error('getInitialNotifiation() failed', err));
  };

  renderNotification(notification) {
    return (
      <View style={{backgroundColor: 'lightgray', margin: 10}}>
        <Text>{`Title: ${notification.title}`}</Text>
        <Text>{`Body: ${notification.body}`}</Text>
        <Text>{`Extra Link Param: ${notification.payload.link}`}</Text>
      </View>
    );
  }

  render() {
    const {children} = this.props;
    return <View style={{flex: 1}}>{children}</View>;
  }
}

/**
 console.log('Notification opened by device user', notification);
 console.log(
 `Notification opened with an action identifier: ${
            notification.identifier
          }`,
 );
 completion()

 **/
