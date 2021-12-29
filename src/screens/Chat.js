import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import {
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";
import { useSelector } from "react-redux";
import { Text } from "../design/Text";
import { Image } from "../design/Image";

const AtherMessages = ({ imgUrl, time, message, id }) => (
  <View style={styles.otherContainer} key={id}>
    <View style={styles.imgContainer}>
      <Image uri={imgUrl} width="50px" height="50px" borderRadus={20} />
      <Text style={styles.time} typography="p2" value={time} />
    </View>
    <Text style={styles.otherContent} typography="p1" value={message} />
  </View>
);

const MeMessages = ({ time, message, id }) => (
  <View style={styles.meContainer} key={id}>
    <Text style={styles.meContent} typography="p1" value={message} />
    <Text style={styles.time} value={time} />
  </View>
);

const Chat = () => {
  const sendBy = useSelector((state) => state.setAccessToken);
  const receivedBy = "r1@gmail.com";
  const scrollViewRef = useRef();
  const messagesRef = collection(db, "messages");

  const [messages, setMessages] = useState([]);
  const [sendMessages, setSendMessages] = useState("");


  useEffect(() => {
    onSnapshot(messagesRef, (snapshot) => {
      const messagesArray = snapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .filter(
          ({ doc }) =>
            doc.data().receivedBy == receivedBy ||
            doc.data().sendBy == receivedBy ||
            doc.data().receivedBy == sendBy ||
            doc.data().sendBy == sendBy
        )
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt?.toDate() };
        })
        .sort((a, b) => a.createdAt?.getTime() - b.createdAt?.getTime());
      setMessages((prev) => [...prev, ...messagesArray]);
    });
    return () => {};
  }, []);

  const handleSend = () => {
    addDoc(collection(db, "messages"), {
      text: sendMessages,
      sendBy: sendBy,
      receivedBy: receivedBy,
      createdAt: new Date(),
    });
    setSendMessages("");
  };

  return (
    <>
      <ScrollView
        style={styles.pageContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.length
          ? messages.map((item) => {
              if (item.sendBy === sendBy) {
                return (
                  <MeMessages
                    id={item._createdAt?.getTime()}
                    time={`${item.createdAt?.getFullYear()}-${item.createdAt?.getMonth()}-${item.createdAt?.getDate()}`}
                    message={item.text}
                  />
                );
              } else {
                return (
                  <AtherMessages
                    id={item._createdAt?.getTime()}
                    time={`${item.createdAt?.getFullYear()}-${item.createdAt?.getMonth()}-${item.createdAt?.getDate()}`}
                    message={item.text}
                  />
                );
              }
            })
          : null}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setSendMessages(e)}
          placeholder="type a message"
          value={sendMessages}
        />
        <Pressable style={styles.sendButton} onPress={() => handleSend()}>
          <Text color="white" value="Send" typography="p2" />
        </Pressable>
      </View>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: "white",
    height: "100%",
    padding: 30,
  },
  otherContainer: {
    flexDirection: "row",
    maxWidth: "80%",
  },
  otherContent: {
    backgroundColor: "rgb(242,242,242)",
    height: "fit-content",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
  },
  meContainer: {
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "60%",
  },
  meContent: {
    backgroundColor: "#3796f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
    color: "white",
  },
  time: {
    color: "grey",
    fontSize: 14,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    height: "7%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgb(218, 220, 223)",
  },
  input: {
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "90%",
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: "rgb(80, 105, 129);",
    borderRadius: 5,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
