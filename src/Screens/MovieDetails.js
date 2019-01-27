import React, {Component} from 'react';
import {Image, ScrollView, Dimensions, Text, View, ActivityIndicator} from 'react-native';
import HTML from 'react-native-render-html';
import renderRating from '../Utils/renderRating';


export default class MovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieData: null,
            id: '',
            cover: null
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', 'Movie'),
        };
    };

    componentDidMount() {
        this.getMovie(this.props.navigation.getParam('movieId', '0'));
    }

    getMovie(id) {
        fetch(`http://api.tvmaze.com/shows/${id}`)
            .then(res => res.json())
            .then((resJson) => {
                let schedule = resJson.status === "Ended" ? "Ended" : `${resJson.schedule.days} at ${resJson.schedule.time}`;
                let genres = '';
                let i;
                    for (i=0;i<resJson.genres.length;i++) {
                        if (i === 0)
                            genres = resJson.genres[i];
                        else
                            genres = genres + ', ' + resJson.genres[i];
                    }
                this.setState({
                    id: resJson.id,
                    title: resJson.name,
                    image: resJson.image.original,
                    rating: resJson.rating.average,
                    summary: resJson.summary,
                    genres: genres,
                    schedule: schedule,
                    network: resJson.network.name,
                    language: resJson.language,
                    isLoading: false
                });

            }).catch(err => console.log(err));
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{backgroundColor: '#252525', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                    <ScrollView style={{backgroundColor: '#252525'}}>
                        <Image source={{uri: this.state.image}}
                               style={styles.imageStyle}/>
                        <View style={{padding: 15}}>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                {renderRating(this.state.rating)}
                            </View>
                            <Text style={[styles.content, {alignSelf: 'center'}]}>
                                ({this.state.rating})
                            </Text>
                            <Text style={{
                                fontSize: 22,
                                color: '#ededec',
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>
                                Show Summary:
                            </Text>
                            <HTML containerStyle={{paddingTop: 0}}
                                  baseFontStyle={{fontSize: 18, color: '#ededec'}} html={this.state.summary}/>
                            <View style={{flexDirection: 'row', marginBottom: 30}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.titles}>Network:</Text>
                                    <Text style={styles.titles}>Schedule:</Text>
                                    <Text style={styles.titles}>Genres:</Text>
                                </View>
                                <View style={{flex: 3}}>
                                    <Text style={styles.content}>{this.state.network}</Text>
                                    <Text style={styles.content}>{this.state.schedule}</Text>
                                    <Text style={styles.content}>{this.state.genres}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            )
        }

    }
}

const styles = {
    imageStyle: {
        width: Dimensions.get('window').width,
        height: 575,
        resizeMode: 'contain'
    },
    details: {
        backgroundColor: '#252525'
    },
    titles: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ededec'
    },
    content: {
        fontSize: 18,
        color: '#ededec'
    },

};
