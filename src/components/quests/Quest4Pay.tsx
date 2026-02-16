// Campus SOL Starter - Quest 4: Solana Pay QR Demo

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, QrCode, Download, CheckCircle, Copy, ShieldCheck, Loader2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { analyzeTransactionRisk } from '@/lib/webacy';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { encodeURL } from '@solana/pay';
import { BigNumber } from 'bignumber.js';

interface Quest4PayProps {
  onComplete: () => void;
  onBack: () => void;
}

export const Quest4Pay = ({ onComplete, onBack }: Quest4PayProps) => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState('0.001');
  const [label, setLabel] = useState('Campus Canteen Payment');
  const [message, setMessage] = useState('Thanks for the meal!');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate Solana Pay URL
  const generatePayUrl = (): string => {
    if (!publicKey) return '';

    try {
      const url = encodeURL({
        recipient: publicKey,
        amount: new BigNumber(amount),
        label,
        message,
        memo: 'CampusSOL',
      });
      return url.toString();
    } catch (error) {
      console.error('Error generating pay URL:', error);
      return '';
    }
  };

  const handleGenerateQR = () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }
    setQrGenerated(true);
    toast.success('QR Code generated!');
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `solana-pay-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleComplete = async () => {
    setVerifying(true);
    // Webacy Risk Audit on self (or hypothetical recipient)
    if (publicKey) {
      const isSafe = await analyzeTransactionRisk(publicKey.toString());
      if (!isSafe) {
        toast.error('Recipient wallet flagged by Webacy!');
        setVerifying(false);
        return;
      }
    }
    setVerifying(false);
    setCompleted(true);
    onComplete();
  };

  const copyPayUrl = () => {
    const url = generatePayUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success('Payment URL copied!');
    }
  };

  const payUrl = generatePayUrl();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Quests
      </Button>

      <Card className="border-2 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-6 h-6 text-purple-400" />
                Quest 4: Solana Pay Demo
              </CardTitle>
              <CardDescription>
                Generate QR codes for instant payments
              </CardDescription>
            </div>
            <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
              +0.004 SOL
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* What is Solana Pay */}
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <h4 className="font-medium mb-2 text-purple-400">What is Solana Pay?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Scan & pay with any Solana wallet</li>
              <li>• No card fees or chargebacks</li>
              <li>• Perfect for campus businesses</li>
              <li>• Settles in seconds, not days</li>
            </ul>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate QR</TabsTrigger>
              <TabsTrigger value="scan">Scan to Pay</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-4">
              {/* QR Configuration */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="amount">Amount (SOL)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.001"
                  />
                </div>

                <div>
                  <Label htmlFor="label">Label (e.g., Business Name)</Label>
                  <Input
                    id="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Campus Canteen"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message (optional)</Label>
                  <Input
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Thanks for your payment!"
                  />
                </div>

                <Button
                  onClick={handleGenerateQR}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>

              {/* QR Display */}
              {qrGenerated && payUrl && (
                <div className="space-y-4 animate-in fade-in">
                  <div
                    ref={qrRef}
                    className="flex justify-center p-6 bg-white rounded-lg"
                  >
                    <QRCodeSVG
                      value={payUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleDownloadQR}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyPayUrl}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Anyone can scan this with Phantom, Solflare, or any Solana wallet
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="scan" className="space-y-4">
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium">Scan to Pay</h4>
                  <p className="text-sm text-muted-foreground">
                    Use your wallet app to scan a Solana Pay QR code
                  </p>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Supported wallets:</p>
                  <div className="flex justify-center gap-2">
                    <div className="px-2 py-1 border rounded text-xs">Phantom</div>
                    <div className="px-2 py-1 border rounded text-xs">Solflare</div>
                    <div className="px-2 py-1 border rounded text-xs">Glow</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Complete Button */}
          {qrGenerated && !completed && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <ShieldCheck className="w-3 h-3 text-green-400" />
                Recipient Audited by DD.xyz
              </div>
              <Button
                onClick={handleComplete}
                disabled={verifying}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
              >
                {verifying ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                I&apos;ve Generated My QR Code
              </Button>
            </div>
          )}

          {/* Success */}
          {completed && (
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 animate-in fade-in">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Quest Completed!</span>
              </div>
            </div>
          )}

          {/* Use Cases */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Campus Use Cases:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-muted rounded">🍔 Canteen payments</div>
              <div className="p-2 bg-muted rounded">📚 Book sales</div>
              <div className="p-2 bg-muted rounded">🎫 Event tickets</div>
              <div className="p-2 bg-muted rounded">💇 Salon services</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
