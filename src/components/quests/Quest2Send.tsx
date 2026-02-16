// Campus SOL Starter - Quest 2: Send First Transaction

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, CheckCircle, ExternalLink, Copy, Loader2, ShieldCheck } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendSOL, verifyTransaction, getExplorerUrl, shortenAddress } from '@/lib/solana';
import { analyzeTransactionRisk } from '@/lib/webacy';
import { toast } from 'sonner';

interface Quest2SendProps {
  verificationAddress: string;
  onComplete: () => void;
  onBack: () => void;
}

export const Quest2Send = ({ verificationAddress, onComplete, onBack }: Quest2SendProps) => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const [txSignature, setTxSignature] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!publicKey || !connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setSending(true);
    try {
      // Webacy Transaction Risk Check
      const isSafe = await analyzeTransactionRisk(verificationAddress);
      if (!isSafe) {
        toast.error('Webacy flagged this recipient as high risk!');
        setSending(false);
        return;
      }

      const signature = await sendSOL(
        { publicKey, sendTransaction } as any,
        verificationAddress,
        0.0001
      );

      setTxSignature(signature);
      toast.success('Transaction sent! Verifying...');

      // Auto-verify
      const isValid = await verifyTransaction(signature);
      if (isValid) {
        setVerified(true);
        toast.success('Transaction verified!');
        onComplete();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send transaction');
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async () => {
    if (!txSignature) {
      toast.error('Please enter a transaction signature');
      return;
    }

    setVerifying(true);
    try {
      const isValid = await verifyTransaction(txSignature);
      if (isValid) {
        setVerified(true);
        toast.success('Transaction verified successfully!');
        onComplete();
      } else {
        toast.error('Transaction not found or not confirmed yet');
      }
    } catch (error) {
      toast.error('Error verifying transaction');
    } finally {
      setVerifying(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(verificationAddress);
    toast.success('Address copied!');
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Quests
      </Button>

      <Card className="border-2 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-400" />
                Quest 2: Send Your First Transaction
              </CardTitle>
              <CardDescription>
                Send 0.0001 SOL to verify your wallet
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              +0.002 SOL
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="font-medium mb-2">What you'll learn:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• How to send SOL to another address</li>
              <li>• Understanding transaction signatures</li>
              <li>• Verifying transactions on the blockchain</li>
            </ul>
          </div>

          {/* Verification Address */}
          <div className="space-y-2">
            <Label>Send 0.0001 SOL to this address:</Label>
            <div className="flex gap-2">
              <code className="flex-1 p-3 bg-muted rounded-lg text-sm break-all">
                {shortenAddress(verificationAddress, 8)}
              </code>
              <Button variant="outline" size="icon" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Send Button */}
          {connected && !verified && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <ShieldCheck className="w-3 h-3 text-green-400" />
                Protected by Webacy DD.xyz
              </div>
              <Button
                onClick={handleSend}
                disabled={sending}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
              >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send 0.0001 SOL Automatically
                </>
              )}
            </Button>
            </div>
          )}

          {/* Manual Verification */}
          {!verified && (
            <div className="space-y-2">
              <Label htmlFor="signature">Or paste transaction signature:</Label>
              <div className="flex gap-2">
                <Input
                  id="signature"
                  placeholder="Enter tx signature..."
                  value={txSignature}
                  onChange={(e) => setTxSignature(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleVerify}
                  disabled={verifying || !txSignature}
                >
                  {verifying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Success State */}
          {verified && (
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 animate-in fade-in">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Transaction Verified!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                You've successfully sent your first Solana transaction!
              </p>
              <a
                href={getExplorerUrl(txSignature)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
              >
                View on Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Tips */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>💡 <strong>Tip:</strong> Every transaction has a unique signature you can verify on the blockchain.</p>
            <p>⛽ <strong>Gas fees:</strong> Solana transactions cost less than $0.01!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
