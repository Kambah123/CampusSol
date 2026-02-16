// Campus SOL Starter - Quest 3: Swap to USDC

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowLeftRight, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getExplorerUrl } from '@/lib/solana';
import { toast } from 'sonner';

interface Quest3SwapProps {
  onComplete: () => void;
  onBack: () => void;
}

export const Quest3Swap = ({ onComplete, onBack }: Quest3SwapProps) => {
  const { publicKey, connected } = useWallet();
  const [txSignature, setTxSignature] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const jupiterUrl = connected && publicKey
    ? `https://jup.ag/swap/SOL-USDC?referrer=${publicKey.toString()}&feeBps=1`
    : 'https://jup.ag/swap/SOL-USDC';

  const handleVerify = async () => {
    if (!txSignature) {
      toast.error('Please enter a transaction signature');
      return;
    }

    setVerifying(true);
    try {
      // Simulate verification - in production, check for USDC balance change
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerified(true);
      toast.success('Swap verified!');
      onComplete();
    } catch (error) {
      toast.error('Error verifying swap');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Quests
      </Button>

      <Card className="border-2 border-green-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="w-6 h-6 text-green-400" />
                Quest 3: Swap to USDC
              </CardTitle>
              <CardDescription>
                Get stable dollars on Solana
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              +0.003 SOL
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* What is USDC */}
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="font-medium mb-2 text-green-400">Why USDC?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pegged 1:1 to the US Dollar - no volatility!</li>
              <li>• Perfect for saving and remittances</li>
              <li>• Send money abroad instantly</li>
              <li>• Protects against Naira fluctuations</li>
            </ul>
          </div>

          {/* Jupiter Link */}
          <div className="space-y-3">
            <Label>Swap using Jupiter Aggregator:</Label>
            <a
              href={jupiterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Open Jupiter Swap
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground text-center">
              Jupiter finds the best rates across all Solana DEXs
            </p>
          </div>

          {/* Quick Guide */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Quick Guide:</h4>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Click the button above to open Jupiter</li>
              <li>Connect your wallet in Jupiter</li>
              <li>Enter amount of SOL to swap (try 0.001 SOL)</li>
              <li>Click "Swap" and approve the transaction</li>
              <li>Copy the transaction signature and paste below</li>
            </ol>
          </div>

          {/* Verification */}
          {!verified && (
            <div className="space-y-2">
              <Label htmlFor="swap-signature">Paste swap transaction signature:</Label>
              <div className="flex gap-2">
                <Input
                  id="swap-signature"
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
                <span className="font-medium">Swap Verified!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                You now have USDC stablecoins in your wallet!
              </p>
              {txSignature && (
                <a
                  href={getExplorerUrl(txSignature)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:underline"
                >
                  View on Explorer
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Nigeria Context */}
          <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-400">
              <strong>🇳🇬 Nigeria Tip:</strong> USDC is great for freelancers receiving
              international payments and students saving for school fees abroad!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
