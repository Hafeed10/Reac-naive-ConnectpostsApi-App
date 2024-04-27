import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = () => {
    const postData = {
      title: title,
      body: body,
      userId: userId,
    };
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(response => {
        console.warn('Post created successfully:', response.data);
        setTitle('');
        setBody('');
        setUserId('');
        // After creating a post, fetch the updated list of posts
        fetchPosts();
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  const fetchPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Connect Posts API</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your title"
          placeholderTextColor="grey"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter body"
          placeholderTextColor="grey"
          value={body}
          onChangeText={text => setBody(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter User id"
          placeholderTextColor="grey"
          value={userId}
          onChangeText={text => setUserId(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.max}>Submit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.head}>API Data</Text>
          {posts.map(post => (
            <View style={styles.view} key={post.id}>
              <Text style={styles.topw}>Title: {post.title}</Text>
              <Text style={styles.body}>Body: {post.body}</Text>
              <Text style={styles.user}>User ID: {post.userId}</Text>
              <Text>-----------------</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 3,
    fontSize: 16,
  },
  button: {
    width: 300,
    height: 40,
    marginTop: 20,
    padding: 10,
    borderRadius: 3,
    fontSize: 16,
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  max: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  view: {
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 3,
    fontSize: 16,
  },
  topw: {
    width: 300,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  user: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
