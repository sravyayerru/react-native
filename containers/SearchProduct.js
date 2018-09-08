import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text
} from "react-native";
import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";

let URI = "http://10.110.60.162:4000";

class SearchProduct extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }
  _getProducts = (page = 1, limit = 40) => {
    this.props.actions.getProducts(page, limit);
  };
  _renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
       
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onSearch = (itemName) => {
    console.log('--' + itemName);
    this.props.actions.searchProductList(this.props.products, itemName);
  }

  render() {
    this.props.products.sort(function(a,b){
      return a.rating - b.rating;
    })
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchBar
          lightTheme
          onChangeText={this._onSearch.bind(this)}
          onClearText={this._onSearch.bind(this)}
          placeholder='Search Products' />

        {
          this.props.isLoading ? (
            <ActivityIndicator size="large" color="#00ff80" />
          ) : (
              this.props.filteredProducts.length > 0 ?
                <FlatList
                  data={this.props.filteredProducts}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                  onEndReachedThreshold={0.5}
                  onEndReached={this._getMore}
                 />
                :
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ justifyContent: 'center', alignItems: 'center' }}>No Products found  </Text>
                  
                </View>
            )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    page: state.productState.page,
    limit: state.productState.limit,
    filteredProducts: state.productState.filteredProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchProduct
);
  
  