import React from 'react';
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

export default function Repository(props) {
  const { navigation } = props;
  const uri = navigation.getParam('repository').html_url;
  return <Browser source={{ uri }} />;
}

Repository.navigationOptions = navigationOptions;
Repository.propTypes = propTypes;
