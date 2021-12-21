// import React from 'react';
// import {StyleSheet, Text, View, Image, TextInput} from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Image
//           style={{width: 50, height: 50}}
//           source={{
//             uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
//           }}
//         />
//         <TextInput />
//         <Text style={styles.loadingText}>Now Loading ...</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'gold',
//   },
//     loadingText: {
//       fontSize: 45,
//     },
// });

//App.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Setting from './Setting.js';

export default class App extends React.Component {
  //변수들을 선언
  constructor(props) {
    super(props);
    this.state = {
      dday: new Date(),
      ddayTitle: '테스트 디데이',
      chatLog: [],
      chatInput: '',
      settingModal: false,
      resultLog: [],
    };
  }
  async UNSAFE_componentWillMount() {
    //AsyncStorage.clear()
    try {
      const ddayString = await AsyncStorage.getItem('@dday');
      const chatLogString = await AsyncStorage.getItem('@chat');
      const resultLogString = await AsyncStorage.getItem('@result');

      //추가
      if (chatLogString == null) {
        this.setState({chatLog: []});
      } else {
        const chatLog = JSON.parse(chatLogString);
        this.setState({chatLog: chatLog});
      }

      if (resultLogString == null) {
        this.setState({resultLog: []});
      } else {
        const resultLog = JSON.parse(resultLogString);
        this.setState({resultLog: resultLog});
      }

      if (ddayString == null) {
        this.setState({
          dday: new Date(),
          ddayTitle: '',
        });
      } else {
        const dday = JSON.parse(ddayString);
        this.setState({
          dday: new Date(dday.date),
          ddayTitle: dday.title,
        });
      }
    } catch (e) {
      // error reading value
      console.log('ERR', e);
    }
  }

  //함수 작성
  toggleSettingModal() {
    this.setState({
      settingModal: !this.state.settingModal,
    });
  }

  chatHandler() {
    this.setState(
      {
        chatLog: [
          ...this.state.chatLog,
          this.makeDateString() + ' : ' + this.state.chatInput,
        ],
        chatInput: '',
      },
      async () => {
        const chatLogString = JSON.stringify(this.state.chatLog);
        await AsyncStorage.setItem('@chat', chatLogString);
      },
    );
  }

  async settingHandler(title, date) {
    this.setState({
      ddayTitle: title,
      dday: date,
    });
    try {
      const dday = {
        title: title,
        date: date,
      };
      const ddayString = JSON.stringify(dday);
      await AsyncStorage.setItem('@dday', ddayString);
    } catch (e) {
      console.log(e);
    }
    this.toggleSettingModal();
  }

  makeDateString() {
    return (
      this.state.dday.getFullYear() +
      '년' +
      (this.state.dday.getMonth() + 1) +
      '월' +
      this.state.dday.getDate() +
      '일'
    );
  }

  makeRemainString() {
    const distance = new Date().getTime() - this.state.dday.getTime();
    //console.log(new Date(), this.state.dday, distance / (1000 * 60 * 60 * 24));
    const remain = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (remain < 0) {
      return 'D' + remain;
    } else if (remain > 0) {
      return 'D+' + remain;
    } else if (remain === 0) {
      return 'D-day';
    }
  }

  getResponse(url) {
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => JSON.stringify(response))
      .then(response => this.setState({result: response}))
      .then(console.log('result: ', this.state.result))
      .then(
        this.setState(
          {
            resultLog: [
              ...this.state.resultLog,
              this.makeDateString() + ' : ' + this.state.result,
            ],
          },
          async () => {
            const resultLogString = JSON.stringify(this.state.resultLog);
            await AsyncStorage.setItem('@result', resultLogString);
          },
        ),
      )
      .catch(error => console.log('error: ', error));
    this.chatHandler();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
          source={require('./images/background7.png')}>
          <View style={styles.settingView}>
            <TouchableOpacity onPress={() => this.toggleSettingModal()}>
              <Image source={require('./icon/setting1.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.ddayView}>
            <Text style={styles.titleText}>{this.state.ddayTitle}</Text>
            <Text style={styles.dateText}>[ {this.makeDateString()} ]</Text>
            <Text style={styles.ddayText}>{this.makeRemainString()}</Text>
          </View>
          <View style={styles.chatView}>
            <ScrollView style={styles.chatScrollView}>
              {this.state.resultLog.map(chat => {
                return <Text style={styles.chat}>{chat}</Text>;
              })}
            </ScrollView>
            <ScrollView style={styles.chatScrollView}>
              {this.state.chatLog.map(chat => {
                return <Text style={styles.chat}>{chat}</Text>;
              })}
            </ScrollView>
            <View style={styles.chatControl}>
              <TextInput
                style={styles.ChatInput}
                value={this.state.chatInput}
                onChangeText={changedText => {
                  this.setState({chatInput: changedText});
                  console.log(this.state.chatInput);
                }}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() =>
                  this.getResponse(
                    'http://10.0.7.57:5000/' + this.state.chatInput,
                  )
                }>
                <Text style={{color: '#FFFFFF'}}>전송</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.settingModal ? (
            <Setting
              modalHandler={() => this.toggleSettingModal()}
              settingHandler={(title, date) => this.settingHandler(title, date)}
            />
          ) : (
            <></>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4A4A4A',
    margin: 2,
    marginLeft: 7,
    marginTop: 5,
  },
  settingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '3%',
  },
  ddayView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatView: {
    flex: 5,
  },
  titleText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ddayText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#4CB5AB',
    height: 40,
    width: 50,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  ChatInput: {
    backgroundColor: 'white',
    width: '76.5%',
    height: 40,
    borderRadius: 15,
  },
  chatControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chatScrollView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
    marginBottom: 10,
  },
});
