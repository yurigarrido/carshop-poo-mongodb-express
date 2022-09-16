import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'mui pequeno' }),
  year: z.number().gte(1900, { message: 'mui novo' }).lte(2022, { message: 'futuro?' }),
  color: z.string().min(3, { message: 'mui pequeno' }),
  status: z.boolean(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema };
