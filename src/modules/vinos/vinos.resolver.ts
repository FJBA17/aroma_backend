import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VinosService } from './vinos.service';
import { Vino } from '../../entities/vino.entity';
import { CreateVinoInput, UpdateVinoInput } from './dto/vino.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Vino)
export class VinosResolver {
  constructor(private vinosService: VinosService) {}

  // Queries públicas (sin autenticación)
  @Query(() => [Vino])
  async vinos(): Promise<Vino[]> {
    return this.vinosService.findAll(false);
  }

  @Query(() => Vino)
  async vino(@Args('id') id: string): Promise<Vino> {
    return this.vinosService.findOne(id);
  }

  // Queries protegidas (requieren autenticación)
  @Query(() => [Vino])
  @UseGuards(GqlAuthGuard)
  async vinosAdmin(@Args('includeInactive', { type: () => Boolean, defaultValue: false }) includeInactive: boolean): Promise<Vino[]> {
    return this.vinosService.findAll(includeInactive);
  }

  // Mutations protegidas (requieren autenticación)
  @Mutation(() => Vino)
  @UseGuards(GqlAuthGuard)
  async createVino(@Args('createVinoInput') createVinoInput: CreateVinoInput): Promise<Vino> {
    return this.vinosService.create(createVinoInput);
  }

  @Mutation(() => Vino)
  @UseGuards(GqlAuthGuard)
  async updateVino(
    @Args('id') id: string,
    @Args('updateVinoInput') updateVinoInput: UpdateVinoInput,
  ): Promise<Vino> {
    return this.vinosService.update(id, updateVinoInput);
  }

  @Mutation(() => Vino)
  @UseGuards(GqlAuthGuard)
  async removeVino(@Args('id') id: string): Promise<Vino> {
    return this.vinosService.remove(id);
  }

  @Mutation(() => Vino)
  @UseGuards(GqlAuthGuard)
  async toggleVinoActive(@Args('id') id: string): Promise<Vino> {
    return this.vinosService.toggleActive(id);
  }

  @Mutation(() => Vino)
  @UseGuards(GqlAuthGuard)
  async updateVinoStock(
    @Args('id') id: string,
    @Args('cantidad', { type: () => Int }) cantidad: number,
  ): Promise<Vino> {
    return this.vinosService.updateStock(id, cantidad);
  }
}
