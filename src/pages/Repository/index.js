import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Browser } from './styles';

const navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

const propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default class Repository extends Component {
  render() {
    const { navigation } = this.props;
    console.tron.log(navigation);
    const { html_url } = navigation.getParam('repository');
    console.tron.log(html_url);
    return <Browser source={{ uri: html_url }} />;
  }
}

Repository.navigationOptions = navigationOptions;
Repository.propTypes = propTypes;
