import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  LoadingIndicator,
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Starred,
  Stars,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
// import { Container } from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    return this.load();
  }

  load = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);
    this.setState({
      loading: false,
      page,
      stars: page > 1 ? [...stars, ...response.data] : response.data,
    });
  };

  loadMore = async () => {
    const { page } = this.state;
    const nextPage = page + 1;
    return this.load(nextPage);
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            loading={loading}
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore} // Função que carrega mais itens
            renderItem={({ item }) => {
              return (
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              );
            }}
          />
        )}
      </Container>
    );
  }
}

User.propTypes = propTypes;
