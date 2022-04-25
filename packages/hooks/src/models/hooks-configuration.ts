import { TokenProviderConfiguration } from '@cossdk/token-provider';
import { HooksOptions } from './hooks-options';

export interface HooksConfiguration extends HooksOptions, TokenProviderConfiguration
{
}