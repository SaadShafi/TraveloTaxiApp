import moment from 'moment';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import CustomTextInput from '../../components/CustomTextInput';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

type Message = {
  text: string;
  time: moment.Moment;
  isSender?: boolean;
};

type ChatItem = {
  type: 'message' | 'date';
  data: Message | string;
};

const ChatMain = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hi, Where are you?', time: moment(), isSender: true },
    { text: 'Arriving in 3 mins', time: moment(), isSender: false },
    { text: 'Arrived', time: moment().subtract(1, 'days'), isSender: false },
    {
      text: 'Coming in 1 min',
      time: moment().subtract(1, 'days'),
      isSender: true,
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const getChatData = (): ChatItem[] => {
    let chatData: ChatItem[] = [];
    let lastDate: string | null = null;

    const sortedMessages = [...messages].sort(
      (a, b) => a.time.valueOf() - b.time.valueOf(),
    );

    sortedMessages.forEach(msg => {
      const msgDate = msg.time.clone().startOf('day');
      let label: string;

      if (msgDate.isSame(moment(), 'day')) {
        label =
          '------------------------------ Today ------------------------------';
      } else if (msgDate.isSame(moment().subtract(1, 'day'), 'day')) {
        label =
          '------------------------------ Yesterday ------------------------------';
      } else {
        label = msgDate.format('DD MMM YYYY');
      }

      if (lastDate !== label) {
        chatData.push({ type: 'date', data: label });
        lastDate = label;
      }

      chatData.push({ type: 'message', data: msg });
    });

    return chatData;
  };

  const sendMessage = () => {
    if (currentMessage.trim().length === 0) return;
    const newMessage: Message = {
      text: currentMessage,
      time: moment(),
      isSender: true,
    };
    setMessages([...messages, newMessage]);
    setCurrentMessage('');
  };

  const renderItem = ({ item }: { item: ChatItem }) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.data}</Text>
        </View>
      );
    }

    const msg = item.data as Message;
    return (
      <View
        style={[
          styles.messageContainer,
          msg.isSender ? styles.senderContainer : styles.receiverContainer,
        ]}
      >
        <View
          style={msg.isSender ? styles.senderChatBox : styles.receiverChatBox}
        >
          <Text
            style={
              msg.isSender
                ? styles.senderMessageText
                : styles.receiverMessageText
            }
          >
            {msg.text}
          </Text>
        </View>
        <Text
          style={msg.isSender ? styles.sendertimeText : styles.receiverTimeText}
        >
          {msg.time.format('h:mm A')}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ top: height * 0.01 }}>
        <TopHeader isBack={true} isPhone={true} />
      </View>
      <View style={styles.headerMain}>
        <View style={styles.headTextMain}>
          <Image source={images.chatProfile} style={styles.chatImg} />
          <View style={{ left: width * 0.04 }}>
            <Text style={styles.textOne}>Adam James</Text>
            <Text style={styles.textSec}>Driver</Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={getChatData()}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chatList}
          inverted={false}
        />
        <View style={styles.inputContainer}>
          <CustomTextInput
            inputHeight={height * 0.07}
            inputWidth={width * 0.79}
            placeholder="Type Here..."
            placeholderTextColor={colors.darkGray}
            borderRadius={30}
            borderColor={colors.lightGray}
            borderWidth={1}
            backgroundColor={colors.white}
            onChangeText={text => setCurrentMessage(text)}
            value={currentMessage}
            multiline
            rightIcon={
              <TouchableOpacity onPress={sendMessage}>
                <Image source={images.sendBtn} style={styles.sendBtn} />
              </TouchableOpacity>
            }
          />
          <Image source={images.voiceBtn} style={styles.voiceBtn} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  textOne: {
    fontFamily: fontFamily.ClashDisplayMedium,
    fontSize: fontSizes.sm2,
    color: colors.black,
  },
  textSec: {
    fontFamily: fontFamily.ClashDisplayRegular,
    fontSize: fontSizes.sm,
    color: colors.black,
  },
  chatImg: {
    width: width * 0.13,
    height: height * 0.09,
    resizeMode: 'contain',
  },
  headerMain: {
    bottom: height * 0.075,
    width: width * 0.72,
    left: width * 0.1,
    padding: 10,
  },
  headTextMain: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: width * 0.03,
  },
  chatList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dateContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  dateText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.JakartaRegular,
    color: colors.black,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '80%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  senderChatBox: {
    backgroundColor: colors.brown,
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 0,
  },
  receiverChatBox: {
    backgroundColor: colors.ligthGray,
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
  },
  senderMessageText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fontFamily.JakartaRegular,
  },
  receiverMessageText: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fontFamily.JakartaRegular,
  },
  sendertimeText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },
  receiverTimeText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  sendBtn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  voiceBtn: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
  },
});

export default ChatMain;
