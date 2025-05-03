import prisma from "../prisma/prismaClient.js";
import { Logger } from './logger.js';

/**
 * Create a new user or get existing one by email
 * @param {string} email - User's email
 * @param {string} name - Optional user name
 */
export async function getOrCreateUser(email, name = null) {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name }
    });
    Logger.success(`User ${email} processed successfully`);
    return user;
  } catch (error) {
    Logger.error(`Failed to process user ${email}: ${error.message}`);
    throw error;
  }
}

/**
 * Create a new campaign
 * @param {string} name - Campaign name
 * @param {string} description - Optional campaign description
 */
export async function createCampaign(name, description = null) {
  try {
    const campaign = await prisma.campaign.create({
      data: { name, description }
    });
    Logger.success(`Campaign "${name}" created successfully`);
    return campaign;
  } catch (error) {
    Logger.error(`Failed to create campaign "${name}": ${error.message}`);
    throw error;
  }
}

/**
 * Log a sent email
 * @param {Object} params - Email parameters
 * @param {string} params.recipientMail - Recipient's email
 * @param {string} params.emailContent - Email content
 * @param {string} params.status - Email status
 * @param {string} params.userId - User ID who sent the email
 * @param {string} [params.campaignId] - Optional campaign ID
 */
export async function logEmailSent({
  recipientMail,
  emailContent,
  status,
  userId,
  campaignId = null
}) {
  try {
    const emailLog = await prisma.emailSent.create({
      data: {
        recipientMail: recipientMail,
        emailContent: emailContent,
        status,
        userId,
        campaignId
      },
      include: {
        user: true,
        campaign: true
      }
    });
    Logger.success(`Email to ${recipientMail} logged successfully`);
    return emailLog;
  } catch (error) {
    Logger.error(`Failed to log email to ${recipientMail}: ${error.message}`);
    throw error;
  }
}

/**
 * Get emails sent by a user
 * @param {string} userId - User ID
 */
export async function getUserEmails(userId) {
  try {
    const emails = await prisma.emailSent.findMany({
      where: { userId },
      include: {
        campaign: true
      },
      orderBy: {
        time_stamp: 'desc'
      }
    });
    Logger.info(`Retrieved ${emails.length} emails for user ${userId}`);
    return emails;
  } catch (error) {
    Logger.error(`Failed to get emails for user ${userId}: ${error.message}`);
    throw error;
  }
}

/**
 * Get all emails in a campaign
 * @param {string} campaignId - Campaign ID
 */
export async function getCampaignEmails(campaignId) {
  try {
    const emails = await prisma.emailSent.findMany({
      where: { campaignId },
      include: {
        user: true
      },
      orderBy: {
        time_stamp: 'desc'
      }
    });
    Logger.info(`Retrieved ${emails.length} emails for campaign ${campaignId}`);
    return emails;
  } catch (error) {
    Logger.error(`Failed to get emails for campaign ${campaignId}: ${error.message}`);
    throw error;
  }
}

/**
 * Get campaign statistics
 * @param {string} campaignId - Campaign ID
 */
export async function getCampaignStats(campaignId) {
  try {
    const stats = await prisma.emailSent.groupBy({
      by: ['status'],
      where: { campaignId },
      _count: true
    });
    
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        _count: {
          select: { emails: true }
        }
      }
    });
    
    Logger.info(`Retrieved stats for campaign ${campaignId}`);
    return {
      campaignName: campaign.name,
      totalEmails: campaign._count.emails,
      statusBreakdown: stats.reduce((acc, stat) => {
        acc[stat.status] = stat._count;
        return acc;
      }, {})
    };
  } catch (error) {
    Logger.error(`Failed to get stats for campaign ${campaignId}: ${error.message}`);
    throw error;
  }
}