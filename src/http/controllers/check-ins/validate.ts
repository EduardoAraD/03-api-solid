import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCkeckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInsParamsSchema.parse(request.params)

  const validateCheckInUserCase = makeValidateCkeckInUseCase()

  await validateCheckInUserCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
