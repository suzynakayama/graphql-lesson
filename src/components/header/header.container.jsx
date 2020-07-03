import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Header from './header.component';

const GET_CART_HIDDEN = gql`
  {
    # @client means we are looking at the local cache
    cartHidden @client
  }
`;

const HeaderContainer = () => (
  <Query query={ GET_CART_HIDDEN }>
    {
      ({data: {cartHidden}}) => <Header hidden={cartHidden} />
    }
  </Query>
)

export default HeaderContainer;