import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../../entities/admin.entity';
import { CreateAdminInput, UpdateAdminInput } from './dto/admin.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(() => [Admin])
  @UseGuards(GqlAuthGuard)
  async admins(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  @UseGuards(GqlAuthGuard)
  async admin(@Args('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  @UseGuards(GqlAuthGuard)
  async createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput): Promise<Admin> {
    return this.adminService.create(createAdminInput);
  }

  @Mutation(() => Admin)
  @UseGuards(GqlAuthGuard)
  async updateAdmin(
    @Args('id') id: string,
    @Args('updateAdminInput') updateAdminInput: UpdateAdminInput,
  ): Promise<Admin> {
    return this.adminService.update(id, updateAdminInput);
  }

  @Mutation(() => Admin)
  @UseGuards(GqlAuthGuard)
  async removeAdmin(@Args('id') id: string): Promise<Admin> {
    return this.adminService.remove(id);
  }
}
