import { Resolver, Query, Mutation, Args, ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';

@ObjectType()
export class ProductType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String)
    category: string;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    stock: number;

    @Field(() => String)
    sku: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}

@Resolver('ProductType')
export class ProductsResolver {
    constructor(private productsService: ProductsService) { }

    @Query(() => [ProductType])
    @UseGuards(GqlAuthGuard)
    async products() {
        return this.productsService.findAll();
    }

    @Mutation(() => ProductType)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles('MANAGER')
    async createProduct(
        @Args('name') name: string,
        @Args('category') category: string,
        @Args('price') price: number,
        @Args('stock') stock: number,
        @Args('sku') sku: string,
        @Args('description', { nullable: true }) description?: string,
    ) {
        return this.productsService.create({ name, category, price, stock, sku, description });
    }

    @Mutation(() => ProductType)
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles('MANAGER')
    async updateProduct(
        @Args('id') id: string,
        @Args({ name: 'name', nullable: true }) name?: string,
        @Args({ name: 'category', nullable: true }) category?: string,
        @Args({ name: 'price', nullable: true, type: () => Float }) price?: number,
        @Args({ name: 'stock', nullable: true, type: () => Int }) stock?: number,
        @Args({ name: 'description', nullable: true }) description?: string,
    ) {
        return this.productsService.update(id, { name, category, price, stock, description });
    }
}
