import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProductItem extends Component {
    render() {
        const {product} = this.props;
        return (
            <div className='col-md-4' style={{marginBottom:'20px'}}>
                <div className="card">
                    <img
                        className="card-img-top"
                        data-src="holder.js/100px180/"
                        alt="100%x180"
                        style={{height:'180px',width:'100%',display:'block'}}
                        src={product.image}
                        data-holder-rendered="true" />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">
                            {product.body.substr(0,100)}
                        </p>
                        <Link to={`/product/${product.id}`} className="btn btn-primary">Details</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductItem;
