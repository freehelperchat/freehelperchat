import encrypter from './Encrypter';
import Session, { SessionProps } from '../models/chat/Session';
import { OperatorProps } from '../models/chat/Operator';

interface IPopulate {
  path: string;
  select?: string;
  populate?: IPopulate;
}

class SessionManager {
  public currentSession: SessionProps | null = null;

  /**
   * Creates a new session for the given user
   * @param operator Operator object from the database
   * @returns The session's token
   */
  public async addSession(operator: OperatorProps): Promise<string> {
    const token = encrypter.randomString(256);
    const session = {
      _id: token,
      operator: operator._id,
      time: new Date().getTime(),
    };
    return Session.create(session)
      .then((res) => res._id)
      .catch(() => null);
  }

  /**
   * Adds the socket id to the User Session
   * @param token Session's token
   * @param socket SocketId of the user
   * @returns Boolean that indicates that the session was updated or not
   */
  public async updateSession(token: string, socket: string): Promise<boolean> {
    const session = await Session.findById(token);
    if (!session) return false;
    session.socket = socket;
    await session.save();
    return true;
  }

  /**
   * Returns the session if it exists
   * @param token Session's token
   * @returns The session document
   */
  private async getSession(token: string): Promise<SessionProps | null> {
    return Session.findById(token).populate({
      path: 'operator',
      select: '-password -__v',
      populate: {
        path: 'roles',
        select: '-__v',
      },
    });
  }

  /**
   * Gets all the active operator sessions
   * @param options Optional options object that will be sent to the populate function
   * @returns All the active sessions
   */
  public async getAllActiveSessions(
    options?: IPopulate,
  ): Promise<SessionProps[] | null> {
    if (!options) {
      return Session.find({ socket: /^(?!\s*$).+/ }).populate({
        path: 'operator',
        select: 'fullName allDepartments activeChats departmentIds',
        populate: {
          path: 'departmentIds',
          select: 'name',
        },
      });
    }

    return Session.find({ socket: /^(?!\s*$).+/ }).populate(options);
  }

  /**
   * Deletes an User Session by the token
   * @param token Session's token
   * @returns Boolean that indicates that the session was deleted or not
   */
  public async deleteSession(token: string): Promise<boolean> {
    return Session.findByIdAndDelete(token)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Deletes an Operator Session by the operatorId
   * @param operator Operator's ID
   * @returns Boolean that indicates that the session was deleted or not
   */
  public async deleteSessionByOperator(operator: string): Promise<boolean> {
    return Session.findOneAndDelete({ operator })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Removes the socketId from a session
   * @param socket The socketId to be removed from its session]
   * @returns Boolean indicating if the socket was removed from the session or not
   */
  public async deleteSessionSocket(socket: string): Promise<boolean> {
    const session = await Session.findOne({ socket });
    if (!session) return false;
    session.socket = undefined;
    await session.save();
    return true;
  }

  /**
   * Checks if a session exists or not
   * @param token Session's token
   * @returns Boolean that indicates if the session exists or not
   */
  public validateSession = async (token: string): Promise<boolean> => {
    this.currentSession = await this.getSession(token);
    return this.currentSession !== null;
  };
}

export default new SessionManager();
