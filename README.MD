## Hosted Project

[Shopping-Cart](https://e-commerce-api-10.herokuapp.com/)

#### Setup Basic Express Server

# Shopping App Schema Design

## User Story

As a shopper, I want to be able to browse a catalog of products and add items to my shopping cart. 
Shoppers(users) can register or login to their account and are able to view the contents of their cart and adjust the quantity of items in their cart. Finally, shoppers will be able to place an order and receive confirmation of their orders.
Only admin can create products, get access to all cart items and all orders. 

## Requirement Analysis

### Entities:

Authentication: This allows for registering and enabling shoppers login to their account and also logging out
Products: A catalogue has a list of products, each with a name, quantity and price.
Cart: This contains items from the products catalogue selected by the shoppers
Shoppers: A shopper has a unique identifier, name, email, and password.
Orders: An order has a unique identifier, the customer who placed it, a list of items, and the total amount amongst other features.

### Relationships:
A shopper can view the Products catalogue, select items into cart and place an order.
Only items selected in cart can be ordered
A shopper can only access contents of carts peculiar to him
An order can contain multiple cart items.
