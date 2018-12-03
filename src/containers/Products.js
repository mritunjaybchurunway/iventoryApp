import React, { Component } from 'react';
import { View, TextInput, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../components/Loading';
import request from '../utils/fetchlib';

// import { List, ListItem, SearchBar } from 'react-native-elements';
import { ListItem, Toolbar } from 'react-native-material-ui';
class Products extends Component {
    constructor(props) {
        super(props);
        this.searchText = this.searchText.bind(this);
        this.state = {
            loading: false,
            data: [],
            error: null,
        };

        this.arrayholder = [];
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = async () => {
        try {
            this.setState({ loading: true });
            const authToken = await AsyncStorage.getItem('authToken');
            const requestURL = `http://192.168.1.7:8000/v1/en/list_products`;
            let options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: authToken
                }
            };
            // fetch(requestURL, options)
            //     .then((res) => res.json())
            //     .then((json) => {
            //         console.log('json value', json);
            //     })
            //     .catch((e) => console.log(e));
            const data = await request(requestURL, options);
            console.log(data);
        }
        catch (e) {
            console.error(e);
        }
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = text => {
        console.log(this.arrayholder);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <Toolbar
                centerElement="Searchable"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: (text) => this.searchText(text)
                }}
                style={{
                    elevation: 10
                }}
            />
        );
    };
    searchText(text) {
        console.log(text);
    }
    render() {
        console.log(this.state);
        if (this.state.loading) {
            return <Loading loadingText='Loading Products' />;
        }
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                renderItem={({ item }) => (
                    <ListItem
                        title={`${item.productName}`}
                        subtitle={item.value}
                    />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}
const styles = {
    inputContainer: {
        backgroundColor: '#fff',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 5
    },
    inputField:
    {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

export default Products;