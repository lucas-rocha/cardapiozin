import PrismaClientSingleton from "@src/databases/PrismaClient";
import { BadRequestError } from "@src/util/errors/ApiError";
import jwt from 'jsonwebtoken'
import { NotificationService } from "./NotificationService";
import { EmailService } from "./EmailService";


export class InviteService {
  constructor(
    private prisma = PrismaClientSingleton.getInstance(),
    private _emailService = new EmailService(),
    private _notificationService: NotificationService = new NotificationService()
  ) {}

  public async createInvite(restaurantId: string, email: string) {
    const existingInvitation = await this.prisma.invitation.findFirst({
      where : {
        email,
        restaurant_id: restaurantId
      }
    })

    if(existingInvitation)
      throw new BadRequestError('Invite already sent!')

    const token = this._generateToken(email)

    const createdInvite = await this.prisma.invitation.create({
      data: {
        email,
        token,
        restaurant_id: restaurantId
      }
    })

    await this._emailService.sendMail({ to: email, subject: 'Convite', text: 'Hello world', html: `<b>Hello world? http://localhost:3000/invite/${token}</b>` })

    console.log(`/convite/${token}`)

    return createdInvite
  }

  public async getInviteByToken(token: string) {
    const invite = await this.prisma.invitation.findUnique({
      where: {
        token
      }
    })

    return invite
  }

  public async acceptInvite(token: string) {
    if(!this._verifyToken(token))
      throw new BadRequestError('Invalid or experied token!')

    const invitation = await this.prisma.invitation.findUnique({
      where: {
        token
      }
    })

    if(!invitation)
      throw new BadRequestError('Invitation does not exists!')

    if(invitation.status !== "PENDING")
      throw new BadRequestError('This invitation cannot be accepted!')
    
    const user = await this.prisma.user.findUnique({
      where: {
        email: invitation.email
      }
    })
    
    if(!user)
      throw new BadRequestError('User does not exists!')

    const newUser = await this.prisma.user_Restaurant.create({
      data: {
        user_id: user.id,
        restaurant_id: invitation.restaurant_id
      }
    })

    const createdInvitation = await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: 'ACCEPTED' }
    })

    await this._notificationService.createNotification(createdInvitation.restaurant_id, "aceitou o convite para participar da organização", "Usuário aceitou o convite para participar da organização", newUser.user_id)
    
    return newUser
  }

  _verifyToken(token: string) {
    return jwt.verify(token, 'ABCD')
  }
  
  _generateToken(email: string) {
    return jwt.sign({email}, 'ABCD', { expiresIn: '1h' })
  }
}