import React, {Component} from 'react';
import axios from 'axios';


class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {}
        }
    }
    componentDidMount() {
        const {params} = this.props.match;
        axios.get(`http://roocket.org/api/products/${params.id}`)
            .then(response => {
                console.log(response.data.data);
                this.setState({
                    product: response.data.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const {product} = this.state;
        return (
            <div className="text-center">
                <h2>{product.title}</h2>
                <img src={product.image} style={{width: '400px'}} />
                <p>{product.body}</p>
            </div>
        );
    }
}

export default Product;
