import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AuthEmailTemplateProps {
  type: 'email-verification' | 'forgot-password';
  url: string;
}

export const AuthEmailTemplate = ({
  type,
  url,
}: AuthEmailTemplateProps) => {
  const isVerification = type === 'email-verification';
  const previewText = isVerification
    ? 'Verify your email for Timbre AI'
    : 'Reset your password for Timbre AI';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Timbre AI</Heading>
          <Text style={text}>
            {isVerification
              ? 'Welcome to Timbre AI! To get started, please verify your email address by clicking the button below.'
              : 'Trouble signing in? No worries! Click the button below to reset your password and get back to creating amazing voices.'}
          </Text>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href={url}
            >
              {isVerification ? 'Verify Email' : 'Reset Password'}
            </Button>
          </Section>
          <Text style={text}>
            If the button doesn't work, you can also copy and paste this link into your browser:
          </Text>
          <Text style={link}>{url}</Text>
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Timbre AI. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
  letterSpacing: '-0.5px',
};

const text = {
  color: '#a3a3a3',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  marginBottom: '24px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 30px',
};

const link = {
  color: '#3b82f6',
  fontSize: '14px',
  lineHeight: '20px',
  wordBreak: 'break-all' as const,
};

const footer = {
  marginTop: '48px',
  borderTop: '1px solid #262626',
  paddingTop: '24px',
};

const footerText = {
  color: '#737373',
  fontSize: '12px',
  textAlign: 'center' as const,
};
