import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Toolbar from 'react-native-toolbar';
import Stars from 'react-native-stars-rating';
import { getProfileResult } from '../Actions/profileSelectionActions';
import styles from './styles.js';
import Utils from '../Utils';

//var navToSearch;

class ExploreScreenEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {
        sightseeing: 'panorama',
        food: 'local-dining',
        sports: 'directions-bike',
        nightlife: 'local-bar',
        music: 'music-note',
        museum: 'account-balance',
        history: 'history',
        politics: 'gavel'
      }
    };
  }

  handleProfileClick(searchIndex) {
    this.props.dispatch(getProfileResult(this.props.search.result[searchIndex]));
    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor:'white' }}>
        <Toolbar
          backgroundColor='#FF8C00' 
          ref={(toolbar) => { this.toolbar = toolbar; }} presets={this.toolbarSetting} />

        <View style={styles.orangeBar} />
        <View style={styles.orangeTintContainer}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search')}}>
          <View style={{ borderWidth: 10, borderColor: 'white' }}>
                {/*<Icon
                name='search'
                size={50}
                color='#FF830D'
                />*/}
                <Text style={styles.orangeText}>
                  {this.props.search.city + '\n'} 
                  {Utils.time.displayDate(new Date(this.props.search.date).toDateString())} {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(this.props.search.toHour)}
                </Text>
          </View>
            </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View>
                {this.props.search.result.map((guide, key) => {
                  if (guide.availabilities.length > 0) {
                    return (
                      <Card
                        key={key}
                        flexDirection='column'
                      >
                      <View style={styles.searchCardContainer}>
                        <Text style={styles.searchCardName} >{guide.user.full_name}</Text>
                      </View>
                      <View style={styles.flexRow}>
                        <Image 
                        style={styles.searchResultImage}
                        source={{ uri: guide.user.picture }} />
                        {/*<Text style={{ marginBottom: 10 }}>
                          {guide.intro}
                        </Text>*/}
                        <View style={{ flexGrow: 1 }}>
                        <Text style={styles.searchCardFont}>
                          Rating:
                        </Text>
                        <Stars
                          isActive={false}
                          isHalfStarEnabled={true}
                          rateMax={5}
                          isHalfStarEnabled={false}
                          rate={Math.ceil(guide.avg_rating)}
                          size={35}
                        />
                        <Text style={styles.searchCardFont}>
                          Specialties:
                        </Text>
                        <View style={styles.specialtiesContainer}>
                          {guide.guideSpecialties.map((specialtyObj, key) =>{
                            return (
                              <View 
                                key={key}
                                style={{ alignItems: 'stretch' }}
                              >
                                <Icon
                                  name={this.state.icons[specialtyObj.specialty.specialty]}
                                  size={33}
                                  color='#373535'
                                />
                              </View>
                            );
                          }
                          )}
                        </View>
                        </View>
                      </View>
                      <View style={styles.goButtonTO}>
                        <TouchableOpacity
                          backgroundColor='#FF8C00'
                          onPress={() => this.handleProfileClick(key)}
                        >
                          <View style={styles.goButtonTextView}>
                            <Text style={styles.goButtonText}>Get to know me!</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Card>
                    );
                  }
                })}
              </View>
            </ScrollView> 
          </View>
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  toolbarSetting = {
      toolbar1: {
        hover: false,
        title:{
          text: 'LOCALIZE',
          textStyle: styles.toolbarText
        }
    },
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(ExploreScreenEntry);

