import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Alert } from 'react-native';

import { colors, metrics } from '../styles';
import { UserInput, UserList } from '../components';

const User = ({ user, iUsers, onEdit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState(iUsers);
  const [userCounter, setUserCounter] = useState(0);

  useEffect(() => {
    if (user) {
      const index = users.findIndex(_user => _user.key === user.key);
      setUsers(prevUsers => {
        const _users = [...prevUsers];
        _users[index] = user;
        return _users;
      });
    }
  }, []);

  const keyGen = key => {
    if (!key) return 10;
    return 10 + (key * 2 - 2);
  };

  const addUser = () => {
    setUsers(users => {
      setUserCounter(userCounter + 1);
      return [
        ...users,
        {
          key: String(keyGen(userCounter + 1)),
          value: { name, phone },
        },
      ];
    });
  };

  const editUser = keyToEdit => {
    onEdit(
      users.find(_user => _user.key === keyToEdit),
      users
    );
  };

  const removeUser = keyToRemove => {
    setUsers(users => users.filter(_user => _user.key !== keyToRemove));
  };

  const confirmRemoveUser = keyToRemove => {
    Alert.alert(
      'Are you sure?',
      'Do you really intend to remove this contact?',
      [
        {
          text: 'Yes! (Remove it)',
          style: 'default',
          onPress: () => removeUser(keyToRemove),
        },
        {
          text: 'No! (Cancel)',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View>
      {/* Insert section */}
      <View style={styles.input}>
        <View style={styles.sub}>
          <UserInput placeholder="Nome" value={name} onSetValue={setName} />
          <UserInput
            placeholder="Telefone"
            value={phone}
            onSetValue={setPhone}
          />
        </View>
        <View style={styles.button}>
          <Button title="+" color={colors.primary} onPress={addUser}></Button>
        </View>
      </View>
      {/* List seciton */}
      <View>
        <UserList
          users={users}
          onEditItem={editUser}
          onDeleteItem={confirmRemoveUser}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: metrics.spacing,
  },
  sub: {
    width: '90%',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default User;
