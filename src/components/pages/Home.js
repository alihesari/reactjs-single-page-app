import React, {Component} from 'react';
import axios from 'axios';
import ProductItem from "../ProductItem";
import InfiniteScroll from 'react-infinite-scroller';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            nextPage: 1,
            hasMore: true
        };
    }

    loadItems() {
        axios.get(`http://roocket.org/api/products?page=${this.state.nextPage}`)
        .then(response => {
            const {data , current_page, last_page} = response.data.data;
            this.setState(prevstat => ({
                products: [...prevstat.products, ...data],
                hasMore: current_page !== last_page,
                nextPage: current_page + 1
            }));
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <InfiniteScroll
                className="row"
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {this.state.products.map((product, index) => <ProductItem product={product} key={index}/>)}
            </InfiniteScroll>
        );
    }
}
export default Home;
