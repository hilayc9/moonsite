import React, {Component} from 'react';
import {View, FlatList, Text, Image, TouchableHighlight, Dimensions} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {SearchBar} from "react-native-elements";
import renderRating from '../Utils/renderRating';
import loading from '../Images/loading.jpg';

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            isLoading: true,
            movies: null,
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerTitle: params.title
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            title:
                <SearchBar
                    placeholder="Search..."
                    round
                    clearIcon={{color: '#ebebec'}}
                    onClear={text => this.searchFilter(text)}
                    onChangeText={text => this.searchFilter(text)}
                    autoCorrect={false}
                    containerStyle={{flex: 1}}
                    />

        });
        this.getMovies();
    }

    getMovies() {
        fetch('http://api.tvmaze.com/shows')
            .then(res => res.json())
            .then((resJson) => {
                let value;

                for (let key in resJson) {
                    if (resJson.hasOwnProperty(key)) {
                        value = resJson[key];
                        this.data.push({
                            "id": value.id,
                            "title": value.name,
                            "image": value.image.medium,
                            "rating": value.rating.average,
                            "status": value.status
                        })
                    }
                }

                this.setState({
                    movies: this.data.sort((a, b) => a.title.localeCompare(b.title)),
                    isLoading: false
                });
                console.log(this.state.movies);
            }).catch(err => console.log(err));
    }

    searchFilter = text => {
        if (text) {
            const newData = this.data.filter(item => {
                const itemData = `${item.title.toUpperCase()}`;
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
            this.setState({movies: newData});
        } else {
            this.setState({movies: this.data});
        }
    };

    onShowPress(title, id) {
        this.props.navigation.navigate('Details', {movieId: id, title});
    }

    render() {
        if (this.state.isLoading)
            return <Image source={loading} style={styles.loading}/>;
        else
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.movies}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <Card transparent>
                                <CardItem style={{backgroundColor: '#252525', marginTop: 30, flexDirection: 'column'}}>
                                    <Body>
                                    <TouchableHighlight style={{alignSelf: 'center'}}
                                                        onPress={() => this.onShowPress(item.title, item.id)}>
                                        <Image source={{uri: item.image}} style={styles.imageStyle}/>
                                    </TouchableHighlight>
                                    </Body>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {renderRating(item.rating)}
                                    </View>
                                    <Text style={{color: '#ededec', alignSelf: 'center'}}>
                                        ({item.rating})
                                    </Text>
                                </CardItem>
                            </Card>
                        )}
                    />
                </View>
            )
    }
}

const styles = {
    loading: {
        flex: 1,
        width: null,
        height: null
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525'
    },
    cards: {
        width: 20
    },
    imageStyle: {
        width: 210,
        height: 295,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    title: {
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ededec',
        marginTop: 10
    },
    star: {
        marginTop: 10,
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginRight: 5
    }
};
