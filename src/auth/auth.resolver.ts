import { Resolver, Mutation, Args, ObjectType, Field, ID } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@ObjectType()
class UserType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role: string;
}

@ObjectType()
class LoginResponse {
    @Field(() => String)
    access_token: string;

    @Field(() => UserType)
    user: UserType;
}

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    async login(
        @Args('email') email: string,
        @Args('password') pass: string,
    ) {
        const user = await this.authService.validateUser(email, pass);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
